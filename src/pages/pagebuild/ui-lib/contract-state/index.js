import DirectGraph from './direct-graph'

var lastNodeId = -1;

function createNode(props, data) {
    var node = {id: ++lastNodeId, reflexive: false, data: data};
    Object.assign(node, props)
    return node
}

//创建渲染需要的数据结构
function formatNodes(nodeList) {
    var nodes = [];
    var links = []
    var nodeMap = {}

    nodeList.forEach(function (nodeArr, index) {
        nodeArr.forEach(function (node) {
            node.stateClass = resolveStateClass(node)
            var tmp = createNode(node.pos, node)

            nodeMap[node.state] = tmp
            nodes.push(tmp)
        })
    })

    nodes.forEach(function (node) {
        node.data.nextStates.forEach(function (next) {
            links.push({
                source: node,
                target: nodeMap[next.state],
                left: false,
                right: true
            })
        })
    })
    return {nodes, links}
}


//生成d3 tree结构
function generateRoot(stateTreeRoot) {
    var node = {
        name: stateTreeRoot.state,
        children: []
    }

    stateTreeRoot.nextStates.forEach(function (next) {
        node.children.push(generateRoot(next))
    })

    return node
}

function resolveStateClass(state) {
    var stateCls = 'is-disabled'
    if (state.isProcess) {
        stateCls = 'is-process'
    } else if (state.isFinish) {
        stateCls = 'is-finish'
    } else if (state.isWaiting) {
        stateCls = 'is-wait'
    }

    if (state.isActive) {
        stateCls += ' is-active'
    }
    return stateCls
}

//根据d3 tree生成的节点坐标设置force 节点的坐标
function setTreeNodePosition(result, opts) {
    var root = generateRoot(result.stateTreeRoot)
    var height = opts.height;
    var width = opts.width;
    var tree = d3.layout.tree().size([height, width])
    var nodes = tree.nodes(root)
    nodes.forEach(function (node) {
        var keys = ['depth', 'x', 'y']
        var stateNode = result.stateMap[node.name]
        if (stateNode) {
            stateNode.pos = {}
            keys.forEach(function (key) {
                stateNode.pos[key] = node[key]
            })
            //将纵向变成横向
            var x = stateNode.pos.x
            stateNode.pos.x = stateNode.pos.y
            stateNode.pos.y = x
        }
    })
}

function parseContract(contractData) {
    var curState = contractData.fsmState
    var policySegment = contractData.policySegment
    var descs = policySegment.fsmDescription
    var activatedStates = policySegment.activatedStates
    var initialState = policySegment.initialState
    var stateMap = {}
    var stateTreeRoot;

    function initStateNode(stateName) {
        return {
            nextStates: [],
            targetEvents: [], //到下一状态可能的路径(事件)
            state: stateName,
            isActive: activatedStates.includes(stateName),
            isProcess: stateName === curState,
            deep: 0
        };
    }

    var nodeList = [] //每层的节点列表

    function walkTree(node) {
        if (!nodeList[node.deep]) {
            nodeList[node.deep] = []
        }
        nodeList[node.deep].push(node)

        if (!node.nextStates.length) {
            return
        }

        node.nextStates.forEach(function (nextNode) {
            var nextStateNode = stateMap[nextNode.state]
            nextStateNode.deep = node.deep + 1

            if (node.isProcess || node.isWaiting) {
                nextStateNode.isWaiting = true
            }

            if (nextStateNode.isProcess) {
                node.isFinish = true
            }

            if (nextStateNode.targetEvents.length) {
                nextStateNode.targetEvents.forEach(function (event) {
                    if (stateMap[event.nextState] && event.nextState !== node.state) {
                        nextStateNode.nextStates.push(stateMap[event.nextState])
                    }
                })
            }
            walkTree(nextStateNode)

            if (nextStateNode.isFinish) {
                node.isFinish = true
            }
        })
    }

    descs.forEach((desc) => {
        var curStateNode = stateMap[desc.currentState] || initStateNode(desc.currentState)
        var nextStateNode = stateMap[desc.nextState]

        curStateNode.targetEvents.push(desc)

        if (!nextStateNode) {
            nextStateNode = initStateNode(desc.nextState);
            stateMap[desc.nextState] = nextStateNode
        }

        //标记根节点的next，便于初始化遍历
        if (desc.currentState === initialState) {
            curStateNode.nextStates.push(nextStateNode)
        }
        stateMap[desc.currentState] = curStateNode
    })

    stateTreeRoot = stateMap[initialState]
    walkTree(stateTreeRoot)

    return {stateTreeRoot, stateMap, nodeList}
}

export default {
    name: 'contract-state',
    props: {
        data: {
            type: Object,
            default() {
                return null
            }
        }
    },
    data() {
        var self = this;
        return {
            popData: {},
            opts: {
                radius: 12,
                width: 400,
                height: 200,
                container: null,
                overlayHandler: function (data) {
                    var popData = Object.assign({}, data)
                    if (data.source) {
                        popData.type = 'path'
                        popData.disabled = data.source.data.state !== self.data.fsmState;
                        var triggerEvents = data.source.data.targetEvents.filter((event) => {
                            return event.nextState === data.target.data.state
                        });
                        popData.event = (triggerEvents[0] && triggerEvents[0].event) || {}
                    } else { //node
                        popData.type = 'node'
                    }
                    self.popData = popData
                    self.$refs.popover.showPopper = true
                }
            }
        }
    },
    mounted() {
        var style = getComputedStyle(this.$refs.wrapper)
        this.opts.$tip = this.$el.querySelector('.js-svg-tip')
        this.opts.container = this.$refs.stateTree;
        this.opts.width = parseInt(parseInt(style.width) * .8)
        this.draw()
    },
    methods: {
        updateContractState(state) {
            state.isProcess = true
            state.isActivated = true;
            this.loadPresentableDetail(this.data.contractId)
                .then((data) => {
                    Object.assign(this.data, data)
                    this.draw()
                })
        },
        triggerLicense(data) {
            return window.QI.fetch('//api.freelog.com/v1/contracts/signingLicenses', {
                method: 'POST',
                data: data
            }).then((res) => {
                return res.json()
            })
        },
        triggerContractState(data) {
            return window.QI.fetch('//api.freelog.com/v1/contracts/test', {
                method: 'POST',
                data: data
            }).then((res) => {
                return res.json()
            })
        },
        loadPresentableDetail(contractId) {
            return window.QI.fetch(`//api.freelog.com/v1/contracts/${contractId}`).then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return Promise.reject(res)
                }
            }).then((res) => {
                if (res.ret === 0 && res.errcode === 0) {
                    return res.data
                } else {
                    return Promise.reject(res)
                }
            })
        },
        activateContractHandler(data) {
            var self = this;
            var contract = self.data;
            var contractId = contract.contractId
            var source = data.source.data
            var target = data.target.data
            var nextState = target.state;

            var triggerEvents = source.targetEvents.filter((event) => {
                return event.nextState === nextState
            })

            if (triggerEvents.length === 0) {
                return self.$message.error('没有可触发的事件')
            } else {
                triggerEvents.forEach((trigger) => {
                    if (trigger.event.type === 'compoundEvents') {
                        trigger.event.params.forEach((event) => {
                            triggerHandler(event)
                        })
                    } else {
                        triggerHandler(trigger.event)
                    }
                })
            }

            function triggerHandler(event) {
                var promise;
                if (event.type === 'signing') {
                    promise = self.triggerLicense({
                        contractId: contractId,
                        eventId: event.eventId,
                        licenseIds: event.params
                    })
                } else {
                    promise = self.triggerContractState({
                        contractId: contractId,
                        eventId: event.eventId
                    })
                }

                Promise.resolve(promise).then((data) => {
                    if (data.ret === 0 && data.errcode === 0) {
                        self.$message.success('操作成功');
                        self.updateContractState(contract, nextState)
                    } else {
                        self.$message.error(data.msg)
                    }
                })
            }
        },
        hidePopover(event) {
            if (['circle', 'path'].includes(event.target.nodeName) || this.$refs.popover.$el.contains(event.target)) {
                event.stopPropagation()
            } else {
                this.$refs.popover.showPopper = false
            }
        },
        draw() {
            if (!this.data.contractId) {
                return
            }
            var result = parseContract(this.data)
            setTreeNodePosition(result, this.opts)
            var resolveData = formatNodes(result.nodeList)
            Object.assign(this.opts, resolveData)
            new DirectGraph(this.opts)
        },
        update(data) {
            this.data = data;
            this.draw()
        }
    }
}
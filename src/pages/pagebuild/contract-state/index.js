import DirectGraph from './direct-graph'

var lastNodeId = -1;

function createNode(props, data) {
    var node = {id: ++lastNodeId, reflexive: false, data: data};
    Object.assign(node, props)
    return node
}

function formatNodes(nodeList) {
    var nodes = [];
    var links = []
    var nodeMap = {}

    nodeList.forEach(function (nodeArr, index) {
        nodeArr.forEach(function (node) {
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
            var x = stateNode.pos.x
            stateNode.pos.x = stateNode.pos.y
            stateNode.pos.y = x
        }
    })
}

export default {
    name: 'contract-state',
    props: {
        contract: {
            type: Object,
            default() {
                return null
            }
        }
    },
    data() {
        var self = this;
        return {
            data: null,
            popData: {},
            opts: {
                radius: 12,
                width: 400,
                height: 200,
                container: null,
                overlayHandler: function (data) {
                    //path
                    var popData = data
                    var html = ''
                    if (data.source) {
                        popData.type = 'path'
                        html += `<h3>状态流转</h3><p>from: ${data.source.data.state} -> target:${data.target.data.state}</p><p><button>执行事件</button></p>`
                    } else { //node
                        popData.type = 'node'
                        html += `<h3>${data.state}</h3>`
                    }

                    Object.assign(self.popData, popData)
                    self.popData = popData
                    self.$refs.popover.showPoper = true
                    return html
                }
            }
        }
    },
    mounted() {
        var self = this;
        var style = getComputedStyle(this.$refs.wrapper)

        this.opts.container = this.$refs.stateTree;
        this.opts.width = parseInt(parseInt(style.width) * .8)

        this.draw()
    },
    methods: {
        parseContract(contractData) {
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
                    isActiveState: activatedStates.includes(stateName),
                    isProcess: stateName === curState,
                    deep: 0
                };
            }

            var deepCounter = {}
            var nodeList = []

            function walkTree(node) {
                if (!deepCounter[node.deep]) {
                    deepCounter[node.deep] = 0
                }

                deepCounter[node.deep]++

                if (!nodeList[node.deep]) {
                    nodeList[node.deep] = []
                }
                nodeList[node.deep].push(node)

                if (!node.nextStates.length) {
                    return
                }

                node.nextStates.forEach(function (stateNode) {
                    var nextStateNode = stateMap[stateNode.state]
                    nextStateNode.deep = node.deep + 1
                    if (nextStateNode.targetEvents.length) {
                        nextStateNode.targetEvents.forEach(function (event) {
                            if (stateMap[event.nextState] && event.nextState !== node.state) {
                                nextStateNode.nextStates.push(stateMap[event.nextState])
                            }
                        })
                    }
                    walkTree(nextStateNode)
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

            // var tree = resolveStateTree(stateTreeRoot);
            // console.log(tree)

            return {stateTreeRoot, stateMap, nodeList}
        },
        draw() {
            if (!this.contract.contractId) {
                return
            }
            var result = this.parseContract(this.contract)
            setTreeNodePosition(result, this.opts)
            var resolveData = formatNodes(result.nodeList)
            Object.assign(this.opts, resolveData)
            var graph = new DirectGraph(this.opts)
        },
        update(data) {
            this.contract = data;
            this.draw()
        }
    }
}
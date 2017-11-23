<template>
    <div id="app">
        <tool-bar></tool-bar>
        <el-dialog
                :close-on-click-modal="false"
                title="签约"
                :visible.sync="showAuthDialog"
                :fullscreen="false"
                custom-class="auth-dialog"
                width="50%"
                center>
            <el-button @click="debugHandler">debugger</el-button>

            <el-tabs type="border-card" value="contract">
                <el-tab-pane label="签约合同">
                    <el-table
                            :data="policies"
                            ref="policyTable"
                            stripe
                            style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <ul>
                                    <li v-for="segment in scope.row.segments" class="segment-row">
                                        <span class="segment-detail">合同ID {{segment.detail.segmentId}}</span>
                                        <el-radio class="select-btn" v-model="scope.row.selectedSegmentId"
                                                  :label="segment.detail.segmentId">选择
                                        </el-radio>
                                    </li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="合同名称"
                                prop="name">
                        </el-table-column>
                        <el-table-column
                                label="资源名称"
                                prop="tagInfo.resourceInfo.resourceName">
                        </el-table-column>
                        <el-table-column
                                label="资源类型"
                                prop="tagInfo.resourceInfo.resourceType"
                                width="120px">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="120px">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="signPolicyHandler(scope.row, scope.$index)"
                                        v-show="!!scope.row.selectedSegmentId">
                                    签约
                                </el-button>
                                <el-button
                                        v-show="!scope.row.selectedSegmentId"
                                        size="mini"
                                        @click="showPolicyDetailHandler(scope.row, scope.$index)">
                                    查看合同
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="激活合同" name="contract">
                    <el-table
                            stripe
                            :data="contracts"
                            ref="contractTable"
                            style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <h3 class="contract-title">合同流程</h3>
                                <ul class="state-steps">
                                    <li class="state-step" v-for="(state, index) in scope.row.states" :class="[
                                    getStateClass(state)
                                    ]">
                                        <div class="state-main">
                                            <div class="state-title">{{state.currentState}} <i class="dot"></i></div>
                                            <div class="state-step-arrow">
                                                <el-button size="mini" v-if="state.isProcess"
                                                           @click="activateContractHandler(scope.row, index)">trigger<i
                                                        class="el-icon-arrow-right"></i></el-button>
                                                <i class="el-icon-arrow-right" v-else></i>
                                                <span v-if="index == 3">
                                <i class="el-icon-more"></i><i class="el-icon-arrow-right"></i>
                            </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="合同ID"
                                prop="contractId"
                                width="240px">
                        </el-table-column>
                        <el-table-column
                                label="资源名称"
                                prop="resourceDetail.resourceName">
                        </el-table-column>
                        <el-table-column
                                label="资源类型"
                                prop="resourceDetail.resourceType"
                                width="120px">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="150px">
                            <template slot-scope="scope">
                                <!--v-show="!scope.row.expanded"-->
                                <el-button
                                        size="mini"
                                        @click="showContractDetailHandler(scope.row, scope.$index)">
                                    查看合同流程
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import ToolBar from './toolbar/index.vue'

    function importHtml(href) {
        return new Promise(function (resolve, reject) {
            const link = document.createElement('link');
            link.onload = resolve;
            link.onerror = reject;
            link.rel = 'import';
            link.href = href;
            document.head.appendChild(link);
        });
    }


    export default {
        data() {
            return {
                policies: [],
                contracts: [],
                policyData: null,
                contractData: null,
                showAuthDialog: true
            }
        },
        components: {ToolBar},
        mounted() {
            var self = this
            var authInfo = window.__auth_info__;
            var authErrorData = authInfo.__auth_error_info__ || {}

            window.addEventListener('authService', self.authServiceHandler.bind(self), false)

            this.checkAuthHandler(authErrorData.data || {})
                .then(() => {
                    self.$widgets = self.getWidgets()
                    self.loadWidgets()
                })
        },
        methods: {
            debugHandler() {
                debugger
            },
            authServiceHandler(event) {
                var detail = event.detail;
                this.checkAuthHandler(detail.data, detail.msg)
            },
            getStateClass(state) {
                var stateCls = 'is-wait'
                if (state.isProcess) {
                    stateCls = 'is-finish'
                } else if (state.isNext) {
                    stateCls = 'is-process'
                }

                if (state.isActiveState) {
                    stateCls += ' is-active'
                }
                return stateCls
            },
            showPolicyDetailHandler(policyData, index) {
                this.$refs.policyTable.toggleRowExpansion(policyData, true)
            },
            showContractDetailHandler(row, index) {
                row.expanded = true
                this.$refs.contractTable.toggleRowExpansion(row, true)
            },
            signPolicyHandler(policyData, index) {
                var self = this;
                if (!policyData.selectedSegmentId) {
                    return this.$message.warning('没有选择策略')
                }
                window.QI.fetch('//api.freelog.com/v1/contracts', {
                    method: 'POST',
                    data: {
                        contractType: 3,
                        targetId: policyData.presentableId,
                        segmentId: policyData.selectedSegmentId,
                        serialNumber: policyData.serialNumber,
                        partyTwo: window.__auth_info__.__auth_user_id__

                    }
                }).then((res) => {
                    return res.json()
                }).then((data) => {
                    if (data.ret === 0 && data.errcode === 0) {
                        self.policies.splice(index, 1)
                        self.$message.success('签约成功')
                        self.resolveContract({contract: data.data})
                    } else {
                        self.$message.error(data.msg)
                    }
                })
            },
            activateContractHandler(contract, index) {
                var self = this;
                var triggerState = contract.states[index]
                var contractId = contract.contractId

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
                            self.updateContractState(contract, index)
                        } else {
                            self.$message.error(data.msg)
                        }
                    })
                }

                if (triggerState.event.type === 'compoundEvents') {
                    triggerState.event.params.forEach((event) => {
                        triggerHandler(event)
                    })
                } else {
                    triggerHandler(triggerState.event)
                }
            },
            updateContractState(contract, index) {
                var state = contract.states[index];
                var nextState;
                state.isProcess = false
                state.isActivated = true;

                if ((nextState = contract.states[index + 1])) {
                    nextState.isProcess = true
                    nextState.isNext = false
                    if (contract.states[index + 2]) {
                        contract.states[index + 2].isNext = true
                    }
                }
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
            getWidgets() {
                var $page = document.querySelector('#js-page-container')
                var $widgets = $page.querySelectorAll('.js-wc-widget');
                return $widgets
            },
            loadResourceDetail(resourceId) {
                return window.QI.fetch(`//api.freelog.com/v1/resources/${resourceId}`).then((res) => {
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
            resolveContract(data) {
                var self = this;
                var contractData = data.contract
                this.loadResourceDetail(contractData.resourceId)
                    .then((resource) => {
                        contractData.states = self.parseContract(contractData)
                        contractData.resourceDetail = resource
                        self.contracts.push(contractData)
                    })
            },
            parseContract(contractData) {
                var curState = contractData.fsmState
                var policySegment = contractData.policySegment
                var descs = policySegment.fsmDescription
                var stateLinks = {}
                var states = []
                var activatedStates = policySegment.activatedStates
                var initialState = policySegment.initialState
                var activated = true
                var isOver = false //避免一个状态多次出现
                var stateMap = {}
                var stateTree = {
                    state: initialState,
                    nextStates: []
                }


                descs.forEach((desc) => {
                    var stateNode = {
                        nextStates: [],
                        targetEvents: [desc], //到当前状态可能的路径(事件)
                        state: desc.nextState
                    }

                    if (desc.currentState === initialState) {
                        stateTree.nextStates.push(stateNode)
                    }

                    if (stateMap[desc.nextState]) {
                        stateMap[desc.nextState].targetEvents.push(desc)
                    } else {
                        stateMap[desc.nextState] = stateNode
                    }
                })


                function walkTree(node) {
                    if (node.nextStates.length) {
                        node.nextStates.forEach(function (stateNode) {
                            stateNode.targetEvents.forEach(function (next) {
                                stateNode.nextStates.push(stateMap[next.currentState])
                            })
                            walkTree(stateNode)
                        })
                    }
                }

//                walkTree(stateTree)


                for (var i = 0; i < descs.length; i++) {
                    let state = descs[i]
                    if (state.currentState === curState && !isOver) {
                        //后续的状态改成未激活
                        state.isProcess = true
                        if (descs[i + 1]) {
                            descs[i + 1].isNext = true
                        }
                        isOver = true
                        activated = false
                    }
                    state.isActiveState = (activatedStates.includes(state.currentState))
                    states.push(state)
//                    if (state.isActiveState) {
//                        break;
//                    }
                }

                return states
            },
            checkAuthHandler(authData, errorMsg) {
                var self = this;

                return new Promise((resolve, reject) => {
                    //如果有报错信息
                    if (authData.authResult) {
                        self.showAuthDialog = true
                        switch (authData.authResult.authErrorCode) {
                            //未激活状态
                            case 70080104:
                                this.resolveContract(authData.data);
                                break;
                            //未签约状态
                            case 70080101:
                                this.loadPolicyDetail(authData.data);
                                break;
                            //节点与资源之间的合约授权失败
                            case 70080202:
                                console.log(errorMsg, authData.data)
                                self.$message.warning(errorMsg)
                                break;
                            default:
                                resolve();
                                break;
                        }
                    } else {
                        resolve()
                    }
                })
            },
            loadPolicyDetail(authData) {
                var self = this
                var presentableId = authData.presentableId;
                var url = '//api.freelog.com/v1/presentables/' + presentableId;
                window.QI.fetch(url).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    var policy = self.parsePolicy(data.data, presentableId)
                    policy.presentableId = presentableId
                    self.policies.push(policy)
                    console.log(policy)
                })
            },
            parsePolicy(data) {
                var self = this;
                var policies = data;
                var policyData = policies;
                Object.assign(policyData, {
                    segments: [],
                    selectedSegmentId: ''
                })
                policies.policy.forEach(function (block) {
                    var segment = {
                        detail: block,
                        states: block.fsmDescription,
                        selected: false
                    }

                    policyData.segments.push(segment)
                })


                return policyData
            },

            loadWidgets() {
                var self = this;
                var $widgets = this.$widgets
                var url = `//api.freelog.com/v1/nodes/${window.__auth_info__.__auth_node_id__}/presentables/`
                Array.from($widgets).forEach(function (widget) {
                    var prensentableId = widget.getAttribute('data-widget-presentable-id');
                    if (prensentableId) {
                        window.QI.fetchPresentable(`${prensentableId}.data`)
                            .then((res) => {
                                return res.text()
                            }).then(function (data) {
                            try {
                                var result = JSON.parse(data)
                                self.checkAuthHandler(result.data, result.msg)
                            } catch (err) {
                                //json解析不成功默认是成功情况
//                                console.log(err)
                                var src = url + `${prensentableId}.data`;
                                importHtml(src)
                            }
                        })
                    } else {

                    }
                })
            }

        }
    }
</script>

<style lang="less" scoped>
    @import "./app.less";

    .event-state {
        padding: 5px;
        font-size: 16px;
    }

    .current-state {
        color: #35b5ff;
    }

    .policy-wrap {
        text-align: center;
    }

    .active-state {
        color: #67C23A;
    }
</style>

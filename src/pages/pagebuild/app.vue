<template>
    <div id="app">
        <tool-bar></tool-bar>
        <el-dialog
                :close-on-click-modal="false"
                title="签约"
                :visible.sync="shouldShowAuthDialog"
                :fullscreen="false"
                custom-class="auth-dialog"
                width="50%"
                center>
            <el-tabs type="border-card" value="contract">
                <el-tab-pane label="待签约合同">
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
                <el-tab-pane label="合同管理" name="contract">
                    <el-table
                            stripe
                            :data="contracts"
                            ref="contractTable"
                            style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <h3 class="contract-title">合同流程</h3>
                                <contract-state class="contract-state-chart" :contract="scope.row"></contract-state>
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
    import ToolBar from '@/components/toolbar/index.vue'
    import ContractState from './contract-state/index.vue'

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
                shouldShowAuthDialog: true,
                contractStateData: {}
            }
        },
        components: {ToolBar, ContractState},
        mounted() {
            var self = this
            var authInfo = window.__auth_info__;
            var authErrorData = authInfo.__auth_error_info__ || {}


            //统一监听服务，根据action进行分发执行器
            window.addEventListener('freelogService', self.serviceDispatchHandler.bind(self), false)

            this.checkAuthHandler(authErrorData.data || {})
                .then(() => {
                    self.$widgets = self.getWidgets()
                    self.loadWidgets()
                })
        },
        methods: {
            showAuthDialog() {
                this.shouldShowAuthDialog = true;
            },
            serviceDispatchHandler(event) {
                var detail = event.detail;
                var data = detail.data;
                var action = detail.action

                if (this[action]) {
                    this[action](detail)
                } else {
                    switch (action) {
                        case 'authService':
                            this.checkAuthHandler(data.data, data.msg)
                            break;
                        default:
                            console.warn('没有定义的服务');
                    }
                }
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

                var tip = `presentable name: ${policyData.name}, resource name: ${policyData.tagInfo.resourceInfo.resourceName}`
                this.$confirm(`合同详情：${tip}。确定签约合同？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    type: 'warning'
                }).then(() => {
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
                }).catch(() => {
                    //取消
                });
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
            loadContractDetail(data) {
                var self = this;
                var contractData = data.contract
                this.loadResourceDetail(contractData.resourceId)
                    .then((resource) => {
                        contractData.resourceDetail = resource
                        self.contracts.push(contractData)
                    })
            },
            checkAuthHandler(authData, errorMsg) {
                var self = this;
                return new Promise((resolve, reject) => {
                    //如果有报错信息
                    if (authData && authData.authResult) {
                        self.showAuthDialog()
                        switch (authData.authResult.authErrorCode) {
                            //未激活状态
                            case 70080104:
                                this.loadContractDetail(authData.data);
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
                                //json解析不成功默认是成功情况,待优化判断逻辑
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

</style>

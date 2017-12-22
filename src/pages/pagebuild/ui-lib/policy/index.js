import compiler from 'freelog_policy_compiler'
import ContractSteps from '../contract-steps/index.vue'
import PresentableDetail from '../presentable-detail/index.vue'
//创建合同
export default {
    name: 'policy-manager',

    data() {
        return {
            loading: false,
            btnType: ''
        }
    },
    props: {
        data: {
            type: Object,
            default() {
                return null
            }
        },
        tabName: String
    },
    watch: {
        data: 'formatPolicy'
    },

    components: {ContractSteps, PresentableDetail},
    mounted() {
        this.formatPolicy()
    },
    methods: {
        formatPolicy() {
            var formatContractDetail = compiler.compile(this.data.policyText, 'beautify')
            if (!formatContractDetail.errorMsg) {
                var formatPolicyText = formatContractDetail.stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
                this.$set(this.data, '_formatPolicyText', formatPolicyText)
            } else {
                this.$message.error(formatContractDetail.errorMsg)
            }

            console.log(this.data)
            this.parsePolicy(this.data)
        },
        parsePolicy(data) {
            var segments = []
            data.policy.forEach(function (block) {
                var segment = {
                    detail: block,
                    states: block.fsmDescription,
                    selected: false
                }

                block._userGroup = block.users.reduce((userGroup, item) => {
                    userGroup = userGroup.concat(item.users)
                    return userGroup
                }, []).join('/')

                segments.push(segment)
            })

            this.$set(this.data, 'segments', segments)
        },
        policyHandler() {
            if (this.btnType) {
                this.gotoExecuteContract()
            } else {
                this.signPolicyHandler()
            }
        },
        gotoExecuteContract() {
            var tabConfig = {
                content: 'contract-manager',
                data: this.data,
                title: '合同管理',
                name: 'tab_' + this.data.presentableId
            }
            this.$emit('tabChange', {
                action: 'close',
                tabName: this.tabName
            })
            this.$emit('tabChange', tabConfig)
        },
        signPolicyHandler() {
            var self = this;
            var policyData = self.data
            if (!policyData.selectedSegmentId) {
                return this.$message.warning('没有选择策略')
            }

            var tip = `presentable name: ${policyData.name}, resource name: ${policyData.resourceDetail.resourceName}`
            this.$confirm(`<h3>合同详情</h3><p>${tip}。</p>确定签约合同？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                type: 'warning'
            }).then(() => {
                self.createContract(policyData)
            }).catch(() => {
                //取消
            });
        },
        createContract(policyData) {
            var self = this;
            if (self.loading) {
                return
            }
            self.loading = true
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
                self.loading = false
                if (data.ret === 0 && data.errcode === 0) {
                    self.btnType = 'success'
                    self.$message.success('签约成功')
                    self.$set(self.data, 'contractDetail', data.data)
                } else {
                    self.$message.error(data.msg)
                }
            })
        }
    }
}
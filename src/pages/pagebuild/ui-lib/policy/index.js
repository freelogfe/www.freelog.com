export default {
    name: 'policy-manager',

    data() {
        return {}
    },
    props: {
        data: {
            type: Object,
            default() {
                return null
            }
        }
    },
    watch: {
        data: 'formatPolicy'
    },

    mounted() {
        this.formatPolicy()
    },
    methods: {
        formatPolicy() {
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

                segments.push(segment)
            })

            this.$set(this.data, 'segments', segments)
        },
        signPolicyHandler(policyData) {
            var self = this;
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
                        self.$message.success('签约成功')
                    } else {
                        self.$message.error(data.msg)
                    }
                })
            }).catch(() => {
                //取消
            });
        }
    }
}
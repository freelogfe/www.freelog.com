import {CONTRACT_STATUS_TIPS} from '../config'
import ContractState from '@/pages/pagebuild/ui-lib/contract-state/index.vue'

export default {
    name: 'presentable-detail',
    data() {
        return {
            CONTRACT_STATUS_TIPS: CONTRACT_STATUS_TIPS,
            showData: {
                contractStatus: ''
            }
        }
    },
    components: {ContractState},

    props: {
        data: {
            type: Object,
            default() {
                return null
            }
        },
        collapseName: String
    },

    watch: {
        data: 'formatData'
    },
    methods: {
        formatData() {
            var data = this.data
            if (data.contractDetail) {
                var userGroup = data.contractDetail.policySegment.users.reduce((users, item) => {
                    users = users.concat(item.users)
                    return users
                }, [])

                console.log(data.contractDetail.status)
                this.$set(data.contractDetail, '_userGroup', userGroup.join('/'))
            }
            // this.showData.contractStatusText = data.contractDetail.fsmState === 'none' ? '正在初始化合同中' : data.contractDetail.fsmState
        }
    }
}
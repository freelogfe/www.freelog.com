import ContractSteps from '../contract-steps/index.vue'
import ContractState from '@/pages/pagebuild/ui-lib/contract-state/index.vue'
import PresentableDetail from '../presentable-detail/index.vue'

import {CONTRACT_STATUS_TIPS} from '../config'

export default {
    name: 'contract-manager',

    data() {
        return {
            CONTRACT_STATUS_TIPS: CONTRACT_STATUS_TIPS
        }
    },
    components: {ContractState, ContractSteps, PresentableDetail},
    props: {
        data: {
            type: Object,
            default() {
                return null
            }
        }
    },
    watch: {
        'data': 'formatData'
    },
    mounted() {
        console.log(this.data)
        this.formatData()
    },
    methods: {
        formatData() {
            var data = this.data

            var userGroup = data.contractDetail.policySegment.users.reduce((users, item) => {
                users = users.concat(item.users)
                return users
            }, [])

            console.log(data.contractDetail.status)
            this.$set(this.data, '_showContractSteps', data.contractDetail.status < 3)
            this.$set(data.contractDetail, '_userGroup', userGroup.join('/'))
        }
    }
}
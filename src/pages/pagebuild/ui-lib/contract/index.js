
import ContractState from '@/pages/pagebuild/ui-lib/contract-state/index.vue'

export default {
    name: 'contract-manager',

    data() {
        return {

        }
    },
    components: {ContractState},
    props: {
        data: {
            type: Object,
            default() {
                return null
            }
        }
    },
    mounted(){
      console.log(this.data)
    },
    methods: {
        showContractDetailHandler() {

        }
    }
}
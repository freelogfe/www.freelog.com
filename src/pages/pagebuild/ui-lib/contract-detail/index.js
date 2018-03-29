import ContractSteps from '../contract-steps/index.vue'
import ContractState from '@/pages/pagebuild/ui-lib/contract-state/index.vue'
import ContractInfoDetail from '../contract-info-detail/index.vue'

export default {
  name: 'contract-detail',

  data() {
    return {
      showContractSteps: false
    }
  },
  components: {
    ContractState,
    ContractSteps,
    ContractInfoDetail
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
    'data': 'formatData'
  },
  mounted() {
    this.formatData()
  },
  methods: {
    formatData() {
      var data = this.data
      this.showContractSteps = data.contractDetail.status < 3
    }
  }
}
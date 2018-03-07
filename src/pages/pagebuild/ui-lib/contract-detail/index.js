import ContractSteps from '../contract-steps/index.vue'
import ContractState from '@/pages/pagebuild/ui-lib/contract-state/index.vue'
import ContractInfoDetail from '../contract-info-detail/index.vue'

export default {
  name: 'contract-detail',

  data() {
    return {}
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

      this.$set(this.data, '_showContractSteps', data.contractDetail.status < 3)
    }
  }
}
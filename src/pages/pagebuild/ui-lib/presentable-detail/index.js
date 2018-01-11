import {CONTRACT_STATUS_TIPS} from '@/config/contract'
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
        if (!data.contractDetail.resourceDetail) {
          data.contractDetail.resourceDetail = data.resourceDetail
        }
        var userGroup = data.contractDetail.policySegment.users.reduce((users, item) => {
          users = users.concat(item.users)
          return users
        }, [])

        this.$set(data.contractDetail, '_userGroup', userGroup.join('/'))
      }
    }
  }
}
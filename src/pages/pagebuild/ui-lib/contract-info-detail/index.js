import {CONTRACT_STATUS_COLORS} from '@/config/contract'
import ContractState from '@/pages/pagebuild/ui-lib/contract-state/index.vue'
import ContractContent from './content.vue'
import LicenseEvent from '../contract-events/license/index.vue'
import TransactionEvent from '../contract-events/transaction/index.vue'
import {storage} from '@/lib'

let eventComponentMap = {
  transaction: {
    type: 'transaction-event',
    title: '支付'
  },
  signing: {
    type: 'license-event',
    title: '签署'
  }
}

export default {
  name: 'contract-info-detail',
  data() {
    return {
      refreshing: false,
      eventComponent: '',
      dialogTitle: '',
      showEventExecDialog: false,
      selectedContractEvent: '',

      showData: {
        contractStatus: ''
      }
    }
  },
  components: {ContractState, ContractContent, LicenseEvent, TransactionEvent},

  props: {
    data: {
      type: Object,
      default() {
        return null
      }
    },
    collapseName: String
  },
  mounted() {
  },
  methods: {
    refreshHandler() {
      if (this.refreshing) return
      this.refreshing = true
      this.updateContract()
        .then(() => {
          this.refreshing = false
        })
        .catch(() => {
          this.refreshing = false
        })
    },
    handleCloseDialog(done) {
      this.closeDialogHandler()
      done()
    },
    updateContract() {
      return this.$store.dispatch('loadContractDetail', this.data.contractDetail.contractId)
    },
    closeDialogHandler(detail) {
      if (detail && detail.shouldUpdate) {
        setTimeout(() => {
          this.updateContract()
        }, 5e2) //由于后端支付存在延迟，临时延迟update，后续根据订单支付状态进行优化展示
      }
      this.eventComponent = ''
      this.dialogTitle = ''
      this.showEventExecDialog = false;
    },
    executeContractHandler(params) {
      var eventComConfig = eventComponentMap[params.type]

      this.selectedContractEvent = {
        event: params,
        contract: this.data.contractDetail,
        resource: this.data.resourceInfo
      }
      this.eventComponent = eventComConfig.type;
      this.dialogTitle = eventComConfig.title
      this.showEventExecDialog = true;
    }
  }
}

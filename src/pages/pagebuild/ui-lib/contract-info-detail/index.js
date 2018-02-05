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

  watch: {
    data: 'formatData'
  },
  methods: {
    loadContractDetail(contractId) {
      return window.QI.fetch(`/v1/contracts/${contractId}`).then((res) => {
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
    refreshHandler() {
      if (this.refreshing) return
      this.refreshing = true
      this.updateContract()
        .then((data) => {
          this.refreshing = false
          this.$eventBus.$emit('updateList', {update: data})
          this.formatData()
        })
        .catch(() => {
          this.refreshing = false
        })
    },
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

        var _statusInfo = CONTRACT_STATUS_COLORS[data.contractDetail.status]
        this.$set(data.contractDetail, '_statusInfo', _statusInfo)
        this.$set(data.contractDetail, '_userGroup', userGroup.join('/'))

        this.$store.dispatch('getCurrentUserInfo')
          .then((userInfo) => {
            this.$set(data.contractDetail, 'partyTwoInfo', userInfo)
          })

        this.loadNodeInfo().then((nodeInfo) => {
          this.$set(data.contractDetail, 'partyOneInfo', nodeInfo)
        })
      }
    },
    loadNodeInfo() {
      var nodeId = window.__auth_info__.__auth_node_id__
      return new Promise((resolve) => {
        var nodesInfo = storage.get('nodesInfo') || {}
        if (nodesInfo[nodeId]) {
          resolve(nodesInfo[nodeId])
        } else {
          this.$axios.get(`/v1/nodes/${nodeId}`).then((res) => {
            nodesInfo[nodeId] = res.data.data
            storage.set('nodesInfo', nodesInfo)
            resolve(res.data.data)
          })
        }
      })
    },
    handleCloseDialog(done) {
      this.closeDialogHandler()
      done()
    },
    updateContract() {
      return this.loadContractDetail(this.data.contractDetail.contractId)
        .then((data) => {
          this.$set(this.data, 'contractDetail', data)
          return {contract: data}
        })
    },
    closeDialogHandler(detail) {
      if (detail && detail.shouldUpdate) {
        setTimeout(() => {
          this.updateContract()
            .then((data) => {
              this.$eventBus.$emit('updateList', {update: data})
              this.formatData()
            })
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
        contract: this.data.contractDetail
      }
      this.eventComponent = eventComConfig.type;
      this.dialogTitle = eventComConfig.title
      this.showEventExecDialog = true;
    }
  }
}

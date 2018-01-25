import {CONTRACT_STATUS, CONTRACT_STATUS_COLORS} from '@/config/contract'


export default {
  name: 'presentables',

  data() {
    return {
      presentables: [],
      CONTRACT_STATUS_ACTION_TIPS: {
        0: '通知节点',
        '-1': '去创建合同',
        1: '去执行合同', //未开始执行
        2: '去执行合同', //执行中
        3: '合同生效中',
        4: '用户终止合同',
        5: '系统终止合同',
        6: '合同已终止'
      }
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return null
      }
    }
  },
  mounted() {
    this.formatPresentableList(this.data)
    this.$eventBus.$on('updateList', this.refresh.bind(this))
  },
  watch: {
    data: function () {
      this.formatPresentableList(this.data)
    }
  },
  methods: {
    refresh(detail) {
      if (detail && detail.update) {
        let contract = detail.update.contract
        if (detail.update.contract) {
          this.presentables.forEach((p) => {
            if (p.contractId === contract.contractId) {
              Object.assign(p.contractDetail, contract)
            }
          })
        }
      }
      this.formatPresentableList(this.presentables)
    },
    //todo 待分页
    formatPresentableList(presentables) {
      var self = this;
      presentables.forEach((presentable) => {
        self.resovlePresentableStatus(presentable)
      })

      presentables = presentables.slice(0)
      presentables.sort((p1, p2) => {
        return (p1._contractStatus - p2._contractStatus)
      })
      this.presentables = presentables
    },
    resovlePresentableStatus(presentable) {
      if (presentable.contractDetail) {
        presentable._contractStatus = presentable.contractDetail.status
      } else if (presentable.nodeContractDetail) {
        presentable.name = presentable.resourceDetail.resourceName
        presentable._contractStatus = CONTRACT_STATUS.invalid
      } else {
        presentable._contractStatus = CONTRACT_STATUS.uncreated
      }

      presentable._statusInfo = CONTRACT_STATUS_COLORS[presentable._contractStatus]
    },
    notifyNodeUser() {
      //todo 提示节点执行资源合同（变成生效状态）
      this.$message.success('已通知')
    },
    tabActionHandler(presentable) {
      var tabConfig = {
        content: 'contract-detail',
        data: presentable,
        title: '合同管理',
        name: 'tab_' + presentable.presentableId
      }

      switch (presentable._contractStatus) {
        case CONTRACT_STATUS.invalid:
          this.notifyNodeUser();
          break;
        case CONTRACT_STATUS.uncreated:
          Object.assign(tabConfig, {
            title: '创建合同',
            content: 'contract-creator',
            name: 'create_' + presentable.presentableId
          })
        case CONTRACT_STATUS.initial:
        case CONTRACT_STATUS.running:
        case CONTRACT_STATUS.activated:
        case CONTRACT_STATUS.userTerminated:
        case CONTRACT_STATUS.sysTerminated:
        case CONTRACT_STATUS.terminated:
          this.$emit('tabChange', tabConfig)
          break;
        default:
          this.$message('no action')
      }
    }
  }
}

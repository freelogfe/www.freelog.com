import {CONTRACT_STATUS, CONTRACT_STATUS_COLORS} from '@/config/contract'
import Tabs from '../tabs'

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
      type: Object,
      default() {
        return null
      }
    }
  },

  watch: {
    data: 'formatPresentableList'
  },

  mounted() {
    this.formatPresentableList()
  },
  methods: {
    formatPresentableList() {
      var presentables = Object.values(this.data)
      presentables.sort((p1, p2) => {
        return (p1._contractStatus - p2._contractStatus)
      })
      this.presentables = presentables
    },
    notifyNodeUser() {
      //todo 提示节点执行资源合同（变成生效状态）
      this.$message.success('已通知')
    },
    tabActionHandler(presentable) {
      var tabConfig = Tabs.getTabConfig('contractDetail', presentable)
      switch (presentable._contractStatus) {
        case CONTRACT_STATUS.invalid:
          this.notifyNodeUser();
          break;
        case CONTRACT_STATUS.uncreated:
          tabConfig = Tabs.getTabConfig('contractCreator', presentable)
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

import OrderStatus from '@/config/order'

export default {
  name: 'transaction-event',
  data() {
    return {
      accounts: [],
      password: '',
      fromAccountId: '',
      showError: false
    }
  },
  props: {
    data: {
      type: Object,
      default(){
        return null
      }
    }
  },
  computed: {
    unitType() {
      return this.data.event.params[0].substr(0, 4)
    }
  },
  mounted() {
    this.$axios.get('/v1/pay/accounts').then((res) => {
      this.accounts = res.data.data;
    })
  },
  methods: {
    doneHandler(shouldUpdate) {
      this.$emit('close', {shouldUpdate})
    },
    payResultHandler(result) {
      var statusInfo = OrderStatus[result.status]
      var msg = (statusInfo && statusInfo.desc) || '未知的支付状态';
      (result.status === 1) && (msg = (`${msg}，稍后查询支付结果`))
      this.$message.success(msg)
    },
    pay() {
      var self = this;
      this.$axios.post('/v1/pay', {
        "targetId": self.data.contract.contractId,
        "orderType": 1,
        "fromAccountId": self.fromAccountId,
        "toAccountId": self.data.event.params[0],
        "amount": self.data.event.params[1],
        "password": self.password
      }).then((res) => {
        var data = res.data
        if (data.errcode === 0) {
          this.showError = false
          this.$message.success('操作成功')
          this.payResultHandler(data.data)
          this.doneHandler({shouldUpdate: data.status === 2, payResult: data})
        } else {
          this.showError = true
          this.$message.error(data.msg)
        }
      })
    }
  }
}

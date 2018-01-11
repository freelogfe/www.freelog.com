export default {
  name: 'transaction-event',
  data() {
    return {
      accounts: [],
      password: '',
      fromAccountId: ''
    }
  },
  props: ['data'],
  computed: {
    unitType() {
      return this.data.event.params[0].substr(0, 4)
    }
  },
  mounted() {
    console.log(this.data)
    this.$axios.get('/v1/pay/accounts').then((res) => {
      this.accounts = res.data.data;
    })
  },
  methods: {
    doneHandler(shouldUpdate) {
      this.$emit('close', {shouldUpdate})
    },
    payResultHandler(result) {
      switch (result.status) {
        case 1:
          this.$message.success('支付进行中，稍后查询支付结果')
          break;
        case 2:
          this.$message.success('支付成功')
          break;
        case 3:
          this.$message.success('支付失败')
          break;
        default:
          this.$message.info('未知的支付状态')
      }
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
          this.$message.success('操作成功')
          this.payResultHandler(data.data)
          this.doneHandler(true)
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}

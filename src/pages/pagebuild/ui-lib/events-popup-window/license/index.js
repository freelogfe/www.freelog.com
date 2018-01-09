export default {
  name: 'license-event',
  data() {
    return {
      dialogVisible: true,
      options: [{
        accountId:'123'
      }],
      account: '',
      password: ''
    }
  },
  watch: {
    showDialog: function() {
      setTimeout(function() {
        document.querySelector('.v-modal').style.zIndex  = 0;
      }.bind(this), 0)
      this.dialogVisible = this.showDialog
    }
  },
  props: ['params','showDialog'],
  methods: {
    pay() {
      console.log(this.params);
      var self = this;
           window.QI.fetch('//api.freelog.com/v1/contracts/signingLicenses', {
              method: 'POST',
              data: {
                  "contractId": self.params.contractId,
                  "eventId": self.params.eventId,
                  "licenseIds": self.params.params
              }
          }).then((res) => {
              return res.json()
          }).then((data)=> {

              this.$parent.$emit('test', 'hi')
              console.log('3333333333333');
                if (data.ret === 0 && data.errcode === 0) {
                    self.$message.success('操作成功');
                    self.$refs.popover.showPopper = false
                    self.updateContractState(contract, nextState)
                } else {
                    self.$message.error(data.msg)
                }
          })
    }
  }
}

export default {
  name: 'transaction-event',
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
          }).then(() => {
            this.$parent.$emit('finish', data)
            console.log('3333333333333');
          })
    }
  }
}

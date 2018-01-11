export default {
  name: 'license-event',
  data() {
    return {
      accepted: false
    }
  },
  props: ['data'],
  mounted() {
    console.log(this.data)
  },
  methods: {
    doneHandler(shouldUpdate) {
      this.$emit('close', {shouldUpdate})
    },
    signHandler() {
      var self = this;
      this.$axios.post('/v1/contracts/signingLicenses', {
        "contractId": self.data.contract.contractId,
        "eventId": self.data.event.eventId,
        "licenseIds": self.data.event.params
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('签约成功')
          this.doneHandler(true)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}

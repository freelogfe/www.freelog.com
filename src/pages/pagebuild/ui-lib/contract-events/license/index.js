export default {
  name: 'license-event',
  data() {
    return {
      accepted: false,
      licenses: []
    }
  },
  props: ['data'],
  mounted() {
    this.loadLicenses()
  },
  methods: {
    loadLicenses() {
      var promises = this.data.event.params.map((rid) => {
        return this.loadLicenseContent(rid)
      })

      Promise.all(promises).then((list) => {
        this.licenses = list
      }).catch((err)=> {
        this.$message.error(err)
      })
    },

    loadLicenseContent(resourceId) {
      return this.$axios.get(`/v1/auths/resource/${resourceId}.data`)
        .then((res) => {
          return res.data;
          // var error = res.getData().errcode;
          // if ( error== 15 ) {
          //   this.$message.warning('协议格式不正确，请联系合约作者。')
          //   return;
          // }
          // return res.getData()
        }).catch((err)=> {
          this.$message.error(err)
        })
    },

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

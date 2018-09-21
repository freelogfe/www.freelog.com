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
      const promises = this.data.event.params.map(rid => this.loadLicenseContent(rid))

      Promise.all(promises).then((list) => {
        this.licenses = list
      })
        .catch((err) => {
          this.$message.error(err)
        })
    },

    loadLicenseContent(resourceId) {
      return this.$axios.get(`/v1/auths/resource/${resourceId}.data`)
        .then(res => res.data)
        .catch((err) => {
          this.$message.error(err)
        })
    },

    doneHandler(shouldUpdate) {
      this.$emit('close', { shouldUpdate })
    },
    signHandler() {
      const self = this
      this.$axios.post('/v1/contracts/signingLicenses', {
        contractId: self.data.contract.contractId,
        eventId: self.data.event.eventId,
        licenseIds: self.data.event.params
      })
        .then((res) => {
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

import compiler from '@freelog/presentable-policy-compiler'
import ContractSteps from '../contract-steps/index.vue'
import ContractInfoDetail from '../contract-info-detail/index.vue'

//创建合同
export default {
  name: 'contract-creator',

  data() {
    return {
      loading: false,
      btnType: ''
    }
  },
  props: {
    data: {
      type: Object,
      default() {
        return null
      }
    },
    tabName: String
  },
  watch: {
    data: 'formatPolicy'
  },

  components: {ContractSteps, ContractInfoDetail},
  mounted() {
    this.formatPolicy()
  },
  methods: {
    formatPolicy() {
      try {
        var formatPolicyText = compiler.beautify(this.data.policyText)
        this.$set(this.data, '_formatPolicyText', formatPolicyText)

        if (this.data.segments) {
          this.data.segments.forEach((segment) => {
            segment.detail._formatPolicyText = compiler.beautify(segment.detail.segmentText)
          })
        }
      } catch (err) {
        this.$message.error(err)
      }

      this.parsePolicy(this.data)
    },
    parsePolicy(data) {
      var segments = []
      data.policy.forEach(function (block) {
        var segment = {
          detail: block,
          states: block.fsmDescription,
          selected: false
        }

        block._userGroup = block.users.reduce((userGroup, item) => {
          userGroup = userGroup.concat(item.users)
          return userGroup
        }, []).join('/')

        segments.push(segment)
      })

      this.$set(this.data, 'segments', segments)
    },
    policyHandler() {
      if (this.btnType) {
        this.gotoExecuteContract()
      } else {
        this.signPolicyHandler()
      }
    },
    gotoExecuteContract() {
      var tabConfig = {
        content: 'contract-detail',
        data: this.data,
        title: '合同管理',
        name: 'tab_' + this.data.presentableId
      }
      this.$emit('tabChange', {
        action: 'close',
        tabName: this.tabName
      })
      this.$emit('tabChange', tabConfig)
    },
    signPolicyHandler() {
      var self = this;
      var policyData = self.data
      if (!policyData.selectedSegmentId) {
        return this.$message.warning('没有选择策略')
      }

      var tip = `<ul><li>presentable name: ${policyData.name}</li><li>resource name: ${policyData.resourceDetail.resourceName}</li></ul>`
      this.$confirm(`<h3>合同详情</h3><p>${tip}</p>确定签约合同？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        self.createContract(policyData)
      }).catch(() => {
        //取消
      });
    },
    cancelSegmentSelection() {
      this.data.selectedSegmentId = ''
    },
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
    updateContractDetail(data) {
      return new Promise((resolve) => {
        //创建合同后，后端存在异步初始化的过程，这时合同状态为none
        if (data.fsmState === 'none') {
          return this.loadContractDetail(data.contractId)
            .then((detail) => {
              Object.assign(data, detail)
              resolve(data)
            })
        } else {
          resolve(data)
        }
      })
    },
    loadPartyTwo() {
      return new Promise((resolve) => {
        if (window.__auth_info__.__auth_user_id__) {
          resolve(window.__auth_info__.__auth_user_id__)
        } else {
          this.$store.dispatch('getCurrentUserInfo').then((userInfo) => {
            resolve(userInfo.userId)
          })
        }
      })
    },
    createContract(policyData) {
      var self = this;
      if (self.loading) {
        return
      }
      self.loading = true

      this.loadPartyTwo()
        .then((userId) => {
          if (!userId) {
            return this.$message.error('获取不到用户ID')
          }
          window.QI.fetch('/v1/contracts', {
            method: 'POST',
            data: {
              contractType: 3,
              targetId: policyData.presentableId,
              segmentId: policyData.selectedSegmentId,
              serialNumber: policyData.serialNumber,
              partyTwo: userId
            }
          }).then((res) => {
            return res.json()
          }).then((data) => {
            self.loading = false
            if (data.ret === 0 && data.errcode === 0) {
              self.btnType = 'success'
              self.$message.success('签约成功')
              this.updateContractDetail(data.data)
                .then((data) => {
                  self.$set(self.data, 'contractDetail', data)
                  self.$eventBus.$emit('updateList')
                })
            } else {
              self.$message.error(data.msg)
            }
          })
        })
        .catch((err) => {
          self.loading = false
          self.$error.showErrorMessage(err)
        })
    }
  }
}

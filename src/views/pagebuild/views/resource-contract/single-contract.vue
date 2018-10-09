<template>
  <div v-if="isFetchedContracts">
    <div class="cutoff-line"></div>
    <div class="sc-content">
      <div class="sc-cont-header">
        {{presentableName}}
        <span
                :class="['sc-tag', `sc-tag-${contractState.type}`]"
        >{{contractState.tagName}}</span>
      </div>
      <resource-contract
              :presentable="presentable"
              :policyContractsMap="policyContractsMap"
              @cancel-sign="cancelSgin"
              @update-default-contract="updateDefaultContract"
              :getContractState='getContractState'>
      </resource-contract>
    </div>
  </div>
</template>

<script>
import resourceContract from './index.vue'

export default {
  name: 'single-contract',
  props: {
    presentable: {
      tyep: Object,
      required: true
    },
    contractIDs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      resourceName: '',
      defaultContract: null,
      contractState: null, // 资源标签状态
      contracts: [],
      isFetchedContracts: false
    }
  },
  methods: {
    // 根据合同获取 资源标签状态
    getContractState(contract) {
      if (contract === null) {
        return { type: 'nosign', tagName: '未签约', info: '未签约' }
      }
      switch (contract.status) {
        case 1:
        case 2:
          return { type: 'inactive', tagName: '不可用', info: `合同ID ${contract.contractId}` }
        case 3:
          return { type: 'active', tagName: '可用', info: `合同ID ${contract.contractId}` }
        case 4:
        case 5:
        case 6:
          return { type: 'terminate', tagName: '合同终止', info: '合同终止' }
        default:
          return { type: 'nosign', tagName: '未签约', info: '未签约' }
      }
    },
    // 重新部分参数
    reInitialData() {
      Promise.all(this.contractIDs.map(contractId => this.$axios.get(`/v1/contracts/${contractId}`).then(res => res.data)))
        .then((arr) => {
          const contracts = []
          arr.forEach((contractRes) => {
            if (contractRes.errcode === 0) {
              contracts.push(contractRes.data)
            }
          })

          return Promise.resolve(contracts)
        })
        .catch(() => Promise.resolve([]))
        .then((contracts) => {
          this.isFetchedContracts = true
          this.contracts = contracts
          this.defaultContract = this.contracts.length ? this.contracts[0] : null
          this.contractState = this.getContractState(this.defaultContract)
        })
    },
    // 点击取消
    cancelSgin() {
      this.$emit('close-dialog')
    },
    // 默认合同的状态更新
    updateDefaultContract(contract) {
      this.defaultContract = contract
      this.contractState = this.getContractState(this.defaultContract)
    }
  },
  computed: {
    // dislog 标题
    title() {
      return `资源签约&nbsp;&nbsp;&nbsp;&nbsp;${window.location.host}`
    },
    // 节点资源名称
    presentableName() {
      return this.presentable.presentableName
    },
    // 策略集合
    policyList() {
      return this.presentable.policy
    },
    // 合同与策略的关系
    policyContractsMap() {
      const map = {}
      this.contracts.forEach((contract) => {
        map[contract.segmentId] = contract
      })
      return map
    }
  },
  components: {
    resourceContract,
  },
  beforeMount() {
    this.reInitialData()
  },
  destroyed() {

  }
}
</script>

<style lang='less' scoped type="text/less">
  .sc-fe-dislog-footer {
    padding: 0 45px;
    text-align: right;

    .btn-normal {
      padding: 10px 26px;
      font-size: 14px;
      border: none;
      outline: 0;

      &.btn-cancel {
        color: #666;
      }
      &.btn-sign {
        border: 1px solid #CECECE;
        border-radius: 4px;
        color: #333;
      }
    }
  }

  .cutoff-line {
    position: relative;
    top: -20px;
    height: 1px;
    margin: 0 -20px;
    background: #ddd;
  }

  .sc-content {
    padding: 0 45px;

    .sc-cont-header {
      padding: 5px 0 10px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #222;
      font-weight: bold;

    }
  }
</style>


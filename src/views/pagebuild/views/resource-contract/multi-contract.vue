<template>
    <div v-if="isFetchedContracts">
        <div class="cutoff-line"></div>
        <div class="sc-content">
            <div class="sc-left-box sc-resource-list">
                <ul>
                    <li
                        class="sc-resource-item"
                        :class="{'active': index === selectedIndex}"
                        v-for="(item, index) in presentableList"
                        :key="'sc-item-' + (index + 1)"
                        @click="selectedResource(index)"
                    >
                        {{item.presentableName}}
                        <div class="sc-tag-box" v-if="item.contractState">
                            <span
                                :class="['sc-tag', `sc-tag-${item.contractState.type}`]"
                            >{{item.contractState.tagName}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sc-cutoff-line-2"></div>
            <div class="sc-right-box">
                <resource-contract
                    :presentable="selectedPresentable"
                    :policyContractsMap="policyContractsMap"
                    @cancel-sign="cancelSgin"
                    @update-default-contract="updateDefaultContract"
                >
                </resource-contract>
            </div>
        </div>
    </div>
</template>

<script>
import resourceContract from './index.vue'

export default {
  name: 'multi-contract',
  props: {
    presentableList: {
      type: Array,
      required: true
    },
    contractIDs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedIndex: 1,
      isFetchedContracts: false,
      contracts: [],
    }
  },
  methods: {
    updateDefaultContract (contract){
      this.resolvePolicyContractState()
      this.$forceUpdate()
    },
    selectedResource(index) {
      this.selectedIndex = index
      this.resolvePolicyContractState()
    },
    // 根据合同获取 资源标签状态
    getContractState(contract) {
      if (contract === null) {
        return { type: 'nosign', tagName: '未签约', info: '未签约' }
      }
      switch (contract.status) {
        case 1:
        case 2: return { type: 'inactive', tagName: '不可用', info: `合同ID ${contract.contractId}` }
        case 3: return { type: 'active', tagName: '可用', info: `合同ID ${contract.contractId}` }
        case 4:
        case 5:
        case 6: return { type: 'terminate', tagName: '合同终止', info: '合同终止' }
        default: return { type: 'nosign', tagName: '未签约', info: '未签约' }
      }
    },
    // 处理策略与合同的关系
    resolvePolicyContractState() {
      this.targPolicyList.forEach((policy) => {
        const contract = this.policyContractsMap[policy.segmentId] || null
        policy.contractState = this.getContractState(contract)
      })
    },
    resolvePresentableDefaultContractState() {
      this.presentableList.forEach((presentable) => {
        const { resourceId } = presentable
        const contracts = this.resourceIdContractsMap[resourceId] || []

        const defaultContract = contracts[0] || null
        presentable.contractState = this.getContractState(defaultContract)
      })
    },
    // 重新部分参数
    reInitialData() {
      this.defaultContract = this.contracts.length ? this.contracts[0] : null
      this.resolvePolicyContractState()
    },
    // 点击取消
    cancelSgin() {
      this.$emit('close-dislog')
    }
  },
  computed: {
    title() {
      return `资源签约&nbsp;&nbsp;&nbsp;&nbsp;${window.location.host}`
    },
    selectedPresentable() {
      return this.presentableList[this.selectedIndex]
    },
    selectedResourceId() {
      return this.selectedPresentable.resourceId
    },
    targPolicyList() {
      return this.selectedPresentable.policy
    },
    // 合同与策略的关系
    policyContractsMap() {
      const map = {}
      this.contracts.forEach((contract) => {
        map[contract.segmentId] = contract
      })
      return map
    },
    // 合同与策略的关系
    resourceIdContractsMap() {
      const map = {}
      this.contracts.forEach((contract) => {
        const arr = map[contract.resourceId] || []
        arr.push(contract)
        map.set(contract.resourceId, arr)
      })
      return map
    },
  },
  components: {
    resourceContract,
  },
  beforeMount() {
    Promise.all(this.contractIDs.map(contractId =>
      this.$axios({ url: `/v1/contracts/${contractId}` }).then(res => res.data)))
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
        this.contracts = contracts
        this.resolvePolicyContractState()
        this.resolvePresentableDefaultContractState()
        this.isFetchedContracts = true
      })
  },
  mounted() {

  },
  destroyed() {

  }
}
</script>

<style lang='less' scoped type="text/less">

.cutoff-line{ position: relative; top: -20px; height: 1px; margin: 0 -20px; background: #ddd; }
.sc-content{
    position: relative;
    display: flex; margin: 0 -20px;
}
.sc-left-box{
    width: 300px;
}
.sc-cutoff-line-2{ position: absolute; left: 300px; top: -20px; bottom: -20px; width: 1px; background-color: #ddd; }
.sc-right-box{
    position: relative; top: -20px;
    flex: 1; padding: 0 20px;
}

.sc-resource-list{ position: relative; }
.sc-resource-list ul{
    overflow-y: scroll;
    position: absolute; left: 0; top: -20px; bottom: -20px; right: 0;
}

.sc-resource-item{
    white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
    padding: 10px 20px; border-bottom: 1px solid #eee;
    font-size: 14px; color: #222;

    &.active{
        padding-left: 17px; border-left: 3px solid #3C99FC; background-color: #f4f4f4;
    }
}

</style>


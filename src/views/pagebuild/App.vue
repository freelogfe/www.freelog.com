<template>
  <div id="app">
    <fe-dialog
            :close-on-click-modal="false"
            :title="scTitle"
            width="790px"
            top="5vh"
            :visible.sync="isShowSingleContract"
            :beforeClose="beforeClose"
            @close="hideAuthDialog"
            is-destoryed-body
    >
      <single-contract
              :presentable="scAuthPresentable || {}"
              :contractIDs="scAuthContractIDs"
              @close-dialog="hideAuthDialog"
      ></single-contract>
    </fe-dialog>
    <fe-dialog
            :close-on-click-modal="false"
            :title="scTitle"
            width="1000px"
            top="5vh"
            :visible.sync="isShowMultiContracts"
            @close="hideAuthDialog"
    >
      <multi-contracts
              :presentableList="scAuthPresentableList"
              :contractIDs="scAuthContractIDs"
              @close-dialog="hideAuthDialog"
      ></multi-contracts>
    </fe-dialog>

    <tool-bar ref="toolbar"></tool-bar>
  </div>
</template>


<script>
import FeDialog from '@/components/fe-dialog/fe-dialog.vue'
import ToolBar from '@/components/ToolBar/index.vue'
import multiContracts from './views/resource-contract/multi-contracts.vue'
import singleContract from './views/resource-contract/single-contract.vue'

export default {
  data() {
    return {
      scTitle: `资源签约&nbsp;&nbsp;&nbsp;&nbsp;${window.location.hostname}`,
      isShowSingleContract: false,
      isShowMultiContracts: false,
      scAuthPresentable: null,
      scAuthPresentableList: [],
      scAuthContractIDs: [],

      shouldShowAuthDialog: false,
      activeTabName: 'presentables'
    }
  },
  components: {
    FeDialog,
    multiContracts,
    singleContract,
    ToolBar
  },

  computed: {

  },

  mounted() {
    // 表示UI框架渲染完成，可调用
    this.$emit('ready', this)
  },
  methods: {
    hideAuthDialog() {
      this.shouldShowAuthDialog = false
      this.shouldShowAuthDialog = false
      this.isShowSingleContract = false

      this.$emit('close', '{}')
    },
    beforeClose(done) {
      console.log('beforeClose')
      done()
    },
    showSingleAuthDialog(presentable, contractIDs = []) {
      this.scAuthPresentable = presentable
      this.scAuthContractIDs = contractIDs

      this.shouldShowAuthDialog = true
      this.isShowSingleContract = true
      this.isShowMultiContracts = false
    },
    showMultiAuthDialog(presentableList, contractIDs = []) {
      this.scAuthPresentableList = presentableList
      this.scAuthContractIDs = contractIDs

      this.shouldShowAuthDialog = true
      this.isShowSingleContract = false
      this.isShowMultiContracts = true
    },
    showToolBar() {
      this.$refs.toolbar.show()
    },
    hideToolBar() {
      this.$refs.toolbar.hide()
    },
  }
}
</script>

<style lang="less">
  @import "./pagebuild.less";
</style>

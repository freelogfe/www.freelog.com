<template>
  <div id="app">
    <dialog-contracts-single
            :visible.sync="isShowSingleContract"
            @close-dialog="hideAuthDialog"
            :presentable="scAuthPresentable || {}"
            :contractIDs="scAuthContractIDs"
    ></dialog-contracts-single>

    <dialog-contracts-multi
            :visible.sync="isShowMultiContracts"
            @close-dialog="hideAuthDialog"
            :presentableList="scAuthPresentableList"
            :contractIDs="scAuthContractIDs"
    ></dialog-contracts-multi>

    <tool-bar ref="toolbar"></tool-bar>
  </div>
</template>


<script>
import FeDialog from '@/components/fe-dialog/fe-dialog.vue'
import ToolBar from '@/components/ToolBar/index.vue'
import { DialogContractsMulti, DialogContractsSingle } from '@freelog/freelog-ui-contract/src/index.js'

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
    DialogContractsMulti,
    DialogContractsSingle,
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

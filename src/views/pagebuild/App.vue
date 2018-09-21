<template>
  <div id="app">
    <el-alert title="" type="warning"
              v-if="showUpgrade"
              center
              show-icon>请使用<a href="https://www.google.cn/chrome/index.html">chrome</a>访问本页面！
    </el-alert>
    <div v-else>
      <fe-dialog
        :close-on-click-modal="false"
        :title="scTitle"
        width="790px"
        top="5vh"
        :visible.sync="isShowSingleContract"
        :close="hideAuthDialog"
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
        :visible.sync="isShowMultiContract"
        :close="hideAuthDialog"
      >
        <multi-contract
          :presentableList="scAuthPresentableList"
          :contractIDs="scAuthContractIDs"
          @close-dialog="hideAuthDialog"
        ></multi-contract>
      </fe-dialog>

      <tool-bar ref="toolbar"></tool-bar>
    </div>
  </div>
</template>


<script>
import FeDialog from '@/components/fe-dialog/fe-dialog.vue'
import ToolBar from '@/components/ToolBar/index.vue'
import multiContract from './views/resource-contract/multi-contract.vue'
import singleContract from './views/resource-contract/single-contract.vue'

export default {
  data() {
    return {
      scTitle: `资源签约&nbsp;&nbsp;&nbsp;&nbsp;${window.location.hostname}`,
      isShowSingleContract: false,
      isShowMultiContract: false,
      scAuthPresentable: null,
      scAuthPresentableList: [],
      scAuthContractIDs: [],

      showUpgrade: !window.__supports,
      shouldShowAuthDialog: false,
      activeTabName: 'presentables'
    }
  },
  components: {
    FeDialog,
    multiContract,
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
    showSingleAuthDialog(presentable, contractIDs = []) {
      this.scAuthPresentable = presentable
      this.scAuthContractIDs = contractIDs

      this.shouldShowAuthDialog = true
      this.isShowSingleContract = true
      this.isShowMultiContract = false
    },
    showMultiAuthDialog(presentableList, contractIDs = []) {
      this.scAuthPresentableList = presentableList
      this.scAuthContractIDs = contractIDs

      this.shouldShowAuthDialog = true
      this.isShowSingleContract = false
      this.isShowMultiContract = true
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

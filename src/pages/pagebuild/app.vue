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
        top="40px"
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
        top="40px"
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
      <!-- <el-dialog
              :close-on-click-modal="false"
              title="合同管理"
              :visible.sync="shouldShowAuthDialog"
              :fullscreen="false"
              custom-class="auth-dialog"
              @close="_closeDialogHandler"
              width="960px"
              center>
        <el-tabs v-model="activeTabName" type="card" @tab-remove="_removeTab">
          <el-tab-pane label="presentable list" name="presentables">
            <presentables ref="list" :data="pagebuild.presentableMap" @tabChange="_tabChange"></presentables>
          </el-tab-pane>
          <el-tab-pane
                  closable
                  :key="item.name"
                  v-for="(item, index) in tabs"
                  :label="item.title"
                  :name="item.name">
            <component :is="item.content" :tab-name="item.name" :data="item.data"
                       @tabChange="_tabChange" @refresh="refreshHandler"></component>
          </el-tab-pane>
        </el-tabs>
      </el-dialog> -->
    </div>
  </div>
</template>


<script>
  import FeDialog from '@/components/fe-dialog/fe-dialog.vue'
    import multiContract from './ui-lib/resource-contract/multi-contract.vue'
    import singleContract from './ui-lib/resource-contract/single-contract.vue'
    import ToolBar from '@/components/ToolBar/index.vue'
    import ContractState from './ui-lib/contract-state/index.vue'
    import Presentables from './ui-lib/presentables/index.vue'
    import ContractDetail from './ui-lib/contract-detail/index.vue'
    import ContractCreator from './ui-lib/contract-creator/index.vue'
    import Tabs from './ui-lib/tabs'
    import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        scTitle: '资源签约&nbsp;&nbsp;&nbsp;&nbsp;' + window.location.hostname,
        isShowSingleContract: false,
        isShowMultiContract: false,
        scAuthPresentable: null,
        scAuthPresentableList: [],
        scAuthContractIDs: [],

        showUpgrade: !window.__supports,
        shouldShowAuthDialog: false,
        presentables: [],
        tabs: [],
        activeTabName: 'presentables'
      }
    },
    components: {
      FeDialog,
      multiContract,
      singleContract,
      ToolBar,
      ContractState,
      Presentables,
      ContractCreator,
      ContractDetail
    },

    computed: {
      ...mapGetters({
        pagebuild: 'pagebuild'
      })
    },

    mounted() {
      //表示UI框架渲染完成，可调用
      this.$emit('ready', this)
    },
    methods: {
      // refreshHandler() {
        //   this.$refs.list.refresh()
        // },
        // _tabChange(data) {
        //   //关闭tab
        //   if (data.action === 'close') {
        //     this._removeTab(data.tabName)
        //   } else {
        //     var isExisted = this.tabs.some((tab) => {
        //       return tab.name === data.name
        //     })

        //     if (!isExisted) {
        //       this.tabs.push(data);
        //     }
        //     this.activeTabName = data.name;
        //   }
        // },
        // _removeTab(targetName) {
        //   let activeName = this.activeTabName;
        //   if (activeName === targetName) {
        //     this.tabs.forEach((tab, index) => {
        //       if (tab.name === targetName) {
        //         let nextTab = this.tabs[index + 1] || this.tabs[index - 1];
        //         if (nextTab) {
        //           activeName = nextTab.name;
        //         } else {
        //           activeName = null
        //         }
        //       }
        //     });
        //   }

        //   this.activeTabName = activeName || 'presentables';
        //   this.tabs = this.tabs.filter((t) => {
        //     return t.name !== targetName
        //   })
        // },
        // _closeDialogHandler() {
        //   this.$emit('close', {
        //     presentableMap: this.pagebuild.presentableMap
        //   })
        // },
      hideAuthDialog (){
        this.shouldShowAuthDialog = false
        this.shouldShowAuthDialog = false
        this.isShowSingleContract = false
        this.$emit('close', '{}')
      },
      showSingleAuthDialog (presentable, contractIDs = []){
        this.scAuthPresentable = presentable
        this.scAuthContractIDs = contractIDs
        
        this.shouldShowAuthDialog = true
        this.isShowSingleContract = true
        this.isShowMultiContract = false
      },
      showMultiAuthDialog (presentableList, contractIDs = []){
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

<style lang="less" scoped>
  @import "./app.less";

</style>

<template>
  <div id="app">

    <contract-signing-dialog
            :visible.sync="isShowDialog"
            @close-dialog="hideAuthDialog"
            :presentableList="scAuthPresentableList"
    ></contract-signing-dialog>

    <tool-bar ref="toolbar"></tool-bar>
  </div>
</template>


<script>
  import { Message } from 'element-ui'
import FeDialog from '@/components/fe-dialog/fe-dialog.vue'
import ToolBar from '@/components/ToolBar/index.vue'
import { ContractSigningDialog } from '@freelog/freelog-ui-contract/src/index.js'

export default {
  data() {
    return {
      isShowDialog: false,
      scAuthPresentableList: [],
      scAuthContractIDs: [],

      activeTabName: 'presentables'
    }
  },
  components: {
    FeDialog,
    ContractSigningDialog,
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
      this.isShowDialog = false
      this.refreshAuthPresentList()
        .then(data => {
          this.$emit('close', data)
        })
        .catch(e => {
          Message.error(e)
          this.$emit('close', {})
        })
    },
    beforeClose(done) {
      console.log('beforeClose')
      done()
    },
    showSingleAuthDialog(presentable) {
      this.scAuthPresentableList = [presentable]

      this.isShowDialog = true
    },
    showMultiAuthDialog(presentableList) {
      this.scAuthPresentableList = presentableList

      this.isShowDialog = true
    },
    showToolBar() {
      this.$refs.toolbar.show()
    },
    hideToolBar() {
      this.$refs.toolbar.hide()
    },
    refreshAuthPresentList() {
      var nodeId = null
      var presentableIDs = this.scAuthPresentableList.map(p => {
        nodeId = p.nodeId
        return p.presentableId
      })
      return this.$axios.get(`/v1/presentables/auth.json?pids=${presentableIDs}&nodeId=${nodeId}`)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0){
            return res.data
          }else {
            return Promise.reject(res.msg)
          }
        })
    }
  }
}
</script>

<style lang="less">
  @import "./pagebuild.less";
</style>

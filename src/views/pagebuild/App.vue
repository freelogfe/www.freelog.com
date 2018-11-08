<template>
  <div id="app">

    <contract-signing-dialog
            :activeIndex="activePresentableIndex"
            :visible.sync="isShowDialog"
            @close-dialog="hideAuthDialog"
            :presentableList="scAuthPresentableList"
    ></contract-signing-dialog>

    <tool-bar ref="toolbar"></tool-bar>
  </div>
</template>


<script>
  import { Message } from 'element-ui'
import ToolBar from '@/components/ToolBar/index.vue'
import { ContractSigningDialog } from '@freelog/freelog-ui-contract/src/index.js'

export default {
  data() {
    return {
      isShowDialog: false,
      scAuthPresentableList: [],
      scAuthContractIDs: [],
      activeTabName: 'presentables',
      nodePresetableList: [],
      activePresentableIndex: 0
    }
  },
  components: {
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
    showAuthDialog(presentableList, activePresentable) {
      var { nodeId, presentableId } = presentableList[0]
      // var { nodeId, presentableId } = activePresentable

      // this.scAuthPresentableList = presentableList
      // this.resolvePresentableActiveIndex(presentableId)
      // this.isShowDialog = true

      this.getNodePresentableList(nodeId, presentableId)
    },
    showToolBar() {
      this.$refs.toolbar.show()
    },
    hideToolBar() {
      this.$refs.toolbar.hide()
    },
    getNodePresentableList(nodeId, presentableId) {
      this.$axios.get('/v1/presentables', {
        params: {
          nodeId,
          isOnline: 1
        }
      })
        .then(resp => resp.data)
        .then(res => {
          if(res.errcode === 0) {
            this.scAuthPresentableList = res.data
            this.resolvePresentableActiveIndex(presentableId)
            this.isShowDialog = true
          }
        })
    },
    resolvePresentableActiveIndex(presentableId) {
      for(let i = 0; i < this.scAuthPresentableList.length; i++){
        if(this.scAuthPresentableList[i].presentableId === presentableId) {
          this.activePresentableIndex = i
          break
        }
      }
    },
    refreshAuthPresentList() {
      var nodeId = null
      var presentableIDs = this.scAuthPresentableList.map(p => {
        nodeId = p.nodeId
        return p.presentableId
      })

      // 获取presentable授权详情
      return this.$axios.get(`/v1/presentables/auth.json?pids=${presentableIDs}&nodeId=${nodeId}`)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0){
            return res.data
          }else {
            return Promise.reject(res.msg)
          }
        })
    },
  }
}
</script>

<style lang="less">
  @import "./pagebuild.less";
</style>

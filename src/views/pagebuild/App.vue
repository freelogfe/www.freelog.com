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
import { ContractSigningDialog } from '@freelog/freelog-ui-contract/src/index'

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
    hideAuthDialog({ isUpdatedContract }) {
      this.isShowDialog = false
      if (isUpdatedContract) {
        this.refreshAuthPresentList()
          .then((data) => {
            this.$emit('close', data)
          })
          .catch((e) => {
            Message.error(e)
            this.$emit('close', null)
          })
      }
    },
    beforeClose(done) {
      done()
    },
    showAuthDialog(presentableList, activePresentableId) {
      if (presentableList.length === 1) {
        activePresentableId = presentableList[0].presentableId
      }

      this.scAuthPresentableList = presentableList
      this.resolvePresentableActiveIndex(activePresentableId)
      this.isShowDialog = true

      // this.getNodePresentableList(nodeId, presentableId)
    },
    showToolBar() {
      this.$refs.toolbar.show()
    },
    hideToolBar() {
      this.$refs.toolbar.hide()
    },
    resolvePresentableActiveIndex(presentableId) {
      if (typeof presentableId === 'undefined') {
        this.activePresentableIndex = 0
      } else {
        for (let i = 0; i < this.scAuthPresentableList.length; i += 1) {
          if (this.scAuthPresentableList[i].presentableId === presentableId) {
            this.activePresentableIndex = i
            break
          }
        }
      }
    },
    refreshAuthPresentList() {
      let nodeId = null
      const presentableIDs = this.scAuthPresentableList.map((p) => {
        nodeId = p.nodeId
        return p.presentableId
      })

      // 获取presentable授权详情
      return this.$axios.get(`/v1/presentables/auth.json?pids=${presentableIDs}&nodeId=${nodeId}`)
        .then(res => res.data)
        .then((res) => {
          if (res.errcode === 0) {
            return res.data
          }
          return Promise.reject(res.msg)
        })
    },
  }
}
</script>

<style lang="less">
  @import "./pagebuild.less";
</style>

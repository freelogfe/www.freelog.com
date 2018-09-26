<template>
  <div class="resource-contract-box">
    <div class="rcb-id-box">
      <label class="rcb-name">资源ID</label>
      <div class="rcb-value">{{resourceId}}</div>
    </div>
    <div class="rcb-type-box">
      <label class="rcb-name">资源类型</label>
      <div class="rcb-value">{{resourceType}}</div>
    </div>
    <div class="rcb-intro-box" v-if="false">
      <label class="rcb-name">资源描述</label>
      <div class="rcb-value">{{resourceIntro}}</div>
    </div>
    <div class="rcb-tab-box">
      <ul>
        <li
                class="rcb-tab-item"
                :class="{'active': index === actPolicyIndex}"
                v-for="(item, index) in policyList"
                :key="'rc-tab-'+(index+1)"
                @click="exchangePolicy(index)"
        >{{item.policyName + (item.contractState.type !== 'nosign' ? '(已签约)': '')}}
        </li>
      </ul>
    </div>
    <div class="rcb-tab-pane">
      <div class="rcb-tp-contract-content">
        <contract-content
                v-if="actPolicy.contractState.type === 'inactive' && isShowContractContent"
                :data="selectedContract"
                @execute="executeContractHandler"></contract-content>
        <div v-else v-html="actSegmentText"></div>
        <el-dialog
                :title="modalTitle"
                ref="eventDialog"
                :visible.sync="showEventExecModal"
                :before-close="closeModalHandler"
                append-to-body
                :center=true
                width="40%"
        >
          <component
                  :is="eventComponent"
                  @close="closeModalHandler"
                  :data="selectedContractEvent"
          ></component>
        </el-dialog>
      </div>
      <div class="rcb-tp-status-bar">
        {{actPolicy.contractState && actPolicy.contractState.info}}
        <div class="rcb-tp-sb-btn-box" v-if="actPolicy.contractState.type != 'nosign'">
          <button class="rcb-tp-sb-default" v-if="isActPolicyDefault">默认合约</button>
          <button class="rcb-tp-sb-set-default" v-else @click="setDefualtContract">设为默认</button>
        </div>
      </div>
    </div>
    <div class="rcb-remark">
      <div class="rcb-r-left">
        <span v-if="actPolicy.contractState.type === 'nosign'" class="rcb-add-remark" id="rcb-remak" @click="addRemark">添加备注 <i
                class="el-icon-plus"></i> </span>
        <span v-else>备注 <i class="el-icon-edit-outline"></i></span>
      </div>
      <div class="rcb-r-right">
        <div v-if="actPolicy.contractState.type != 'nosign'">{{targRemark}}</div>
        <textarea v-if="actPolicy.contractState.type === 'nosign' && isAddRemark" name="rcb-remak" id=""
                  rows="3"></textarea>
      </div>
    </div>
    <div class="rcb-footer">
      <button class="btn-normal btn-cancel" @click="cancelSign">取消</button>
      <button type="button" class="btn-normal btn-sign" :class="{'disabled': isActPolicySigned}" @click="signContract">
        签约
      </button>
    </div>
  </div>
</template>

<script>

  import compiler from '@freelog/presentable-policy-compiler'
  import FeDialog from '@/components/fe-dialog/fe-dialog.vue'
  import ContractContent from '../contract-info-detail/content.vue'

  import LicenseEvent from '../contract-events/license/index.vue'
  import TransactionEvent from '../contract-events/transaction/index.vue'


  const eventComponentMap = {
    transaction: {
      type: 'transaction-event',
      title: '支付'
    },
    signing: {
      type: 'license-event',
      title: '签署'
    }
  }

  let userinfos = null
  export default {
    props: {
      presentable: {
        type: Object
      },
      policyContractsMap: {
        type: Object,
      },
      getContractState: {
        type: Function,
      }
    },
    data() {
      return {
        resourceIntro: '音乐播放器是一种用于播放各种音乐文件的多媒体播放软件。它涵盖了各种音乐格式的播放工具，比如：MP3播放器，WMA播放器，MP4播放器等。它们不仅界面美观，而且操作简单，带你进入一个完美的音乐空间。',
        actPolicyIndex: 0,
        isActPolicyDefault: false,
        isAddRemark: false,
        selectedContractEvent: '',
        eventComponent: '',
        modalTitle: '',
        showEventExecModal: false,
        userinfos: {},
        isShowContractContent: false,
        isUpdateView: 1,
      }
    },
    methods: {
      // 处理策略与合同状态的关系
      resolvePolicyContractStateMap() {
        this.policyList.forEach((policy) => {
          const contract = this.policyContractsMap[policy.segmentId] || null
          policy.contractState = this.getContractState(contract)
        })
      },
      exchangePolicy(index) {
        this.actPolicyIndex = index
      },
      addRemark() {
        this.isAddRemark = true
      },
      fillSpace(line) {
        return line.replace(/^(\s+)/g, ($) => {
          const spaceArr = new Array($.length)
          spaceArr.fill('&nbsp;&nbsp;')
          return spaceArr.join('')
        })
      },
      // 关闭对话框
      closeModalHandler() {
        this.showEventExecModal = false
      },
      // 合同事件处理
      executeContractHandler(params) {
        const eventComConfig = eventComponentMap[params.type]

        this.selectedContractEvent = {
          event: params,
          contract: this.selectedContract,
          resource: Object.assign(this.presentable, this.presentable.resourceInfo)
        }
        this.eventComponent = eventComConfig.type
        this.modalTitle = eventComConfig.title
        this.showEventExecModal = true
      },
      // 点击“取消” 取消签约并关闭对话框
      cancelSign() {
        this.$emit('cancel-sign')
      },
      // 点击“签约” 执行合同签约
      signContract() {
        const {presentableId} = this.presentable
        const {segmentId} = this.actPolicy

        this.$axios({
          url: '/v1/contracts/createUserPresentableContract',
          method: 'POST',
          data: {
            presentableId,
            segmentId,
            targetId: presentableId
          }
        })
          .then(res => res.data)
          .then((res) => {
            if (res.errcode === 0) {
              const contract = res.data
              this.policyContractsMap[segmentId] = contract
              this.resolvePolicyContractStateMap()
              // 更新policy与contract的映射关系后，强制刷新
              this.$forceUpdate()
              this.$emit('update-default-contract', contract)
            } else {
              throw new Error()
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              showClose: true,
              message: '签约失败，稍后再试！！！'
            })
          })
      },
      // 设置默认合同
      setDefualtContract() {
        this.$axios({
          url: `/v1/contracts/setDefault?contractId=${this.selectedContract.contractId}`,
          method: 'PUT',
        })
          .then(res => res.data)
          .then((res) => {
            if (res.errcode === 0) {
              this.isActPolicyDefault = true
            } else {
              throw new Error()
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              showClose: true,
              message: '设置默认合同失败，稍后再试！！！'
            })
          })
      }
    },
    computed: {
      actPolicy() {
        const policy = this.policyList[this.actPolicyIndex]
        return policy
      },
      isActPolicySigned() {
        return this.actPolicy && this.actPolicy.contractState.type !== 'nosign'
      },
      resourceId() {
        return this.presentable.resourceId
      },
      resourceType() {
        return this.presentable.resourceInfo.resourceType
      },
      policyList() {
        return this.presentable.policy
      },
      selectedContract() {
        const contract = this.policyContractsMap[this.actPolicy.segmentId]
        if (contract) {
          contract.partyOneInfo = {
            nodeName: this.presentable.nodeName,
            ownerUserId: this.presentable.userId
          }
          contract.partyTwoInfo = userinfos
        }

        return contract
      },
      actSegmentText() {
        const lines = compiler.beautify(this.actPolicy.segmentText).split(/\n/)
        let text = ''
        lines.forEach((line) => {
          const html = this.fillSpace(line)
          text += `<p>${html}</p>`
        })
        return text
      },
      targRemark() {
        return ''
      }
    },
    components: {
      ContractContent, FeDialog, TransactionEvent, LicenseEvent
    },
    beforeMount() {
      this.resolvePolicyContractStateMap()
      if (userinfos === null) {
        this.$axios.get('/v1/userinfos/current')
          .then(res => res.data)
          .then((res) => {
            if (res.errcode === 0) {
              userinfos = res.data
              this.isShowContractContent = true
            }
          })
      } else {
        this.isShowContractContent = true
      }
    }
  }
</script>

<style lang="less" scoped type="text/less">
  .rcb-name {
    display: inline-block;
    width: 80px;
    color: #666;
  }

  .rcb-value {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    color: #222;
  }

  .rcb-id-box, .rcb-type-box, .rcb-intro-box {
    display: inline-block;
    margin-top: 20px;
  }

  .rcb-id-box {
    width: 425px;
  }

  .rcb-intro-box {
    display: flex;
    width: 100%;
    .rcb-value {
      flex: 1;
    }
  }

  .rcb-tab-box {
    margin-top: 20px;

    .rcb-tab-item {
      display: inline-block;
      margin: 0 12px;
      line-height: 32px;
      color: #999;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;

      &.active {
        border-bottom: 3px solid #4396F0;
        color: #222;
      }
    }
  }

  .rcb-tab-pane {
    position: relative;
    overflow-y: scroll;
    height: 282px;
    padding-bottom: 46px;
    border: 1px solid #CECECE;
    border-radius: 4px;

    .rcb-tp-status-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 46px;
      padding: 0 10px;
      border-top: 1px solid #CECECE;
      background: #F3F5F5;
      color: #333;
      font-size: 12px;
      line-height: 46px;

      .rcb-tp-sb-btn-box {
        position: absolute;
        top: 0;
        right: 9px;
      }
      .rcb-tp-sb-default, .rcb-tp-sb-set-default {
        width: 100px;
        border-radius: 20px;
        background: #4396F0;
        font-size: 14px;
        line-height: 30px;
      }
      .rcb-tp-sb-default {
        color: #fff;
      }
      .rcb-tp-sb-set-default {
        border: 1px solid #4396F0;
        background: #fff;
        color: #4396F0;
      }
    }
  }

  .rcb-tp-contract-content {
    padding: 15px;
    font-size: 16px;
    line-height: 1.4;
  }

  .rcb-remark {
    display: flex;
    height: 64px;
    margin-top: 30px;
    font-size: 14px;
    color: #222;
    font-weight: bold;

    .rcb-add-remark {
      color: #3C99FC;
    }
    .rcb-r-left {
      width: 78px;
    }
    .rcb-r-right {
      flex: 1;

      textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        border-radius: 4px;
      }
    }
  }

  .rcb-footer {
    padding-top: 20px;
    text-align: right;

    .btn-normal {
      padding: 10px 26px;
      font-size: 14px;
      border: none;
      outline: 0;
      cursor: pointer;

      &.btn-cancel {
        color: #666;
      }
      &.btn-sign {
        border: 1px solid #CECECE;
        border-radius: 4px;
        color: #333;
        &.disabled {
          border: 1px solid #CECECE;
          border-radius: 4px;
          background: #F9F9F9;
          color: #999;
          pointer-events: none;
        }
      }

    }
  }
</style>


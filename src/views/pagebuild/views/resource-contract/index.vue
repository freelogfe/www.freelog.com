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
      <div class="rcb-contract-record" :class="{'disabled': !isHasContractRecord}" @click="toggleContractRecordBox"></div>
    </div>
    <div class="rcb-tab-pane">
      <div class="rcb-tp-contract-content">
        <!--<contract-content-->
                <!--v-if="actPolicy.contractState.type === 'inactive' && isShowContractContent"-->
                <!--:data="selectedContract"-->
                <!--@execute="executeContractHandler"></contract-content>-->
        <contract-detail :contract="selectedContract"></contract-detail>
        <!--<div v-if="actPolicy.contractState.type === 'inactive' && isShowContractContent" v-html="actSegmentText">-->
        <!--</div>-->
        <!--<div v-else v-html="actSegmentText"></div>-->
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
          <button class="rcb-tp-sb-set-default" v-else @click="showSetDefaultContractComfrim">设为默认</button>
        </div>
      </div>
      <div class="rcb-tp-contract-record" :class="{'opened': isOpenContractRecordBox}">
        <table>
          <thead>
            <tr>
              <th>合约ID</th>
              <th>策略名称</th>
              <th>签约时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in contractRecords" :key="'record-'+index">
              <td>{{item.contractId}}</td>
              <td>{{item.policyName}}</td>
              <td>{{item.signDate}}</td>
            </tr>
          </tbody>
        </table>
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
      <button type="button" class="btn-normal btn-sign" :class="{'disabled': isActPolicySigned}" @click="showSignComfirm">
        签约
      </button>
    </div>

    <fe-dialog
            title-text-align="center"
            :close-on-click-modal="false"
            title="提示"
            width="440px"
            top="25vh"
            :visible.sync="isShowComfirm"
            is-destoryed-body
            @close="comfirmCancel"
    >
      <div class="rcb-comfirm-cont">
        <div class="comfirm-set-default-contract" v-if="comfirmType === 'set-default-contract'">
          将当前合约设置为默认合约？
        </div>
        <div class="comfirm-sign-contract" v-if="comfirmType === 'sign-contract'">
          <div class="csn-presentable-name"><span>资源名称</span>&nbsp;&nbsp;&nbsp;&nbsp;{{presentableName}}</div>
          <div class="csn-policy-name">确认以&nbsp;&nbsp;&nbsp;&nbsp;{{actPolicy.policyName}}&nbsp;&nbsp;&nbsp;&nbsp;签约合约？</div>
          <div class="csn-set-default">
            <i>+</i>
            将此合约设定为默认合约
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="rcb-comfirm-btn-box">
          <button class="cbb-btn cbb-cancel" @click="comfirmCancel">取消</button>
          <button class="cbb-btn cbb-sure" @click="comfirmSure">确认</button>
        </div>
      </div>
    </fe-dialog>
  </div>
</template>

<script>

  import compiler from '@freelog/presentable-policy-compiler'
  import FeDialog from '@/components/fe-dialog/fe-dialog.vue'
  import ContractDetail from '../contract-detail/index'
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
        isShowComfirm: false,
        comfirmType: '',
        resourceIntro: '',
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
        isOpenContractRecordBox: false,
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
      // 取消签约并关闭对话框
      cancelSign() {
        this.$emit('cancel-sign')
      },
      // 执行合同签约
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
      },
      // 显示confirm 弹窗
      showComfirm(type) {
        this.isShowComfirm = true
        this.comfirmType = type
      },
      toggleContractRecordBox() {
        this.isOpenContractRecordBox = !this.isOpenContractRecordBox
      },
      comfirmCancel() {
        this.isShowComfirm = false
      },
      comfirmSure() {
        this.isShowComfirm = false
        switch (this.comfirmType) {
          case 'set-default-contract': {
            this.setDefualtContract()
            break
          }
          case 'sign-contract': {
            this.signContract()
            break
          }
        }
      },
      showSetDefaultContractComfrim() {
        this.showComfirm('set-default-contract')
      },
      showSignComfirm() {
        this.showComfirm('sign-contract')
      }

    },
    computed: {
      isHasContractRecord() {
        return false
      },
      contractRecords() {
        return [
          { contractId: '2345ythdnhfgkto87jhddfbg', policyName: '授权策略1', signDate: '2018-09-10 12:00' },
          { contractId: '2345yfsfsfsffso87jhddfbg', policyName: '授权策略2', signDate: '2018-09-10 12:00' },
        ]
      },
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
      // 节点资源名称
      presentableName() {
        return this.presentable.presentableName
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
      ContractContent, FeDialog, TransactionEvent, LicenseEvent, ContractDetail
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
    position: relative;
    margin-top: 20px;

    ul{ margin-right: 30px; }

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

    .rcb-contract-record{
      position: absolute;
      top: 6px;
      right: 5px;
      width: 20px;
      height: 20px;
      background-image: url('../../../../assets/img/normal-record.png');
      cursor: pointer;

      &:hover{
        background-image: url('../../../../assets/img/hover:click-record.png');
      }
    }

    .rcb-contract-record.disabled{
      background-image: url('../../../../assets/img/disable-record.png');
      pointer-events: none;
    }

  }

  .rcb-tab-pane {
    position: relative;
    overflow-y: scroll;
    /*height: 282px;*/
    /*padding-bottom: 46px;*/
    border: 1px solid #CECECE;
    border-radius: 4px;

    .rcb-tp-contract-record{
      display: none;
      box-sizing: border-box;
      overflow: auto;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 20px;
      background: #F3F5F5;
      color: #222;

      &.opened{
        display: block;
      }

      table{
        width: 100%;

        thead{
          border-bottom: 1px solid #CECECE;
        }

        th{
          padding-bottom: 10px;
        }

        td{
          padding: 20px 0;
        }

        tbody{
          tr{
            border-bottom: 1px solid #eee;
          }
        }
      }
    }

    .rcb-tp-status-bar {
      position: relative;
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
        cursor: pointer;
      }
    }
  }

  .rcb-tp-contract-content {
    overflow: auto;
    height: 252px;
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
      cursor: pointer;
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
        outline: none;
        resize: none;
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

  .rcb-comfirm-cont{
    text-align: center;

    .comfirm-set-default-contract{
      font-size: 16px;
      font-weight: bold;
      color: #222;
    }

    .csn-presentable-name{
      margin-bottom: 20px;
      font-size: 16px;
      color: #333;
    }

    .csn-policy-name{
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #222;
    }

    .csn-set-default{
      font-size: 14px;
      color: #c6c6c6;
    }

  }

  .rcb-comfirm-btn-box{
    text-align: center;

    .cbb-btn {
      padding: 6px 20px;
      font-size: 14px;
      border: none;
      outline: 0;
      cursor: pointer;

      &.cbb-cancel {
        color: #666;
      }
      &.cbb-sure {
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


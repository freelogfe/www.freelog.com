<template>
  <div class="presentable-detail">
    <el-form label-position="right" inline label-width="120px" class="presentable-info small-el-form">
      <el-form-item label="presentable名" class="info-row">
        {{data.name }}
      </el-form-item>
      <el-form-item label="资源名" class="info-row">
        {{data.resourceDetail.resourceName }}
      </el-form-item>
      <el-form-item label="资源类型" class="info-row">
        {{data.resourceDetail.resourceType }}
      </el-form-item>
      <template v-if="data.contractDetail">
        <el-form-item label="合同ID" class="info-row">
          {{data.contractDetail.contractId }}
        </el-form-item>
        <el-form-item label="创建日期" class="info-row">
          <span>{{ data.contractDetail.createDate|fmtDate }}</span>
        </el-form-item>
        <el-form-item label="合同状态" class="info-row" v-if="data.contractDetail._statusInfo">
          <el-tag :type="data.contractDetail._statusInfo.type">
            {{data.contractDetail._statusInfo.desc}}
          </el-tag>
        </el-form-item>
        <el-form-item label="执行状态" class="info-row">
          {{data.contractDetail.fsmState==='none'?'正在初始化合同中':data.contractDetail.fsmState}}
          <i class="el-icon-refresh" :class="{loading: refreshing}" @click="refreshHandler" v-if="data.contractDetail.status < 3"></i>
        </el-form-item>
        <el-form-item label="甲方" class="info-row">
          <span v-if="data.contractDetail.partyOneInfo">{{ data.contractDetail.partyOneInfo.nodeName }}</span>
          <span v-else>{{ data.contractDetail.partyOne }}</span>
        </el-form-item>
        <el-form-item label="乙方" class="info-row">
          <span v-if="data.contractDetail.partyTwoInfo">{{ data.contractDetail.partyTwoInfo.nickname }}</span>
          <span v-else>{{ data.contractDetail.partyTwo }}</span>
        </el-form-item>
        </el-form-item>
        <el-form-item label="合同目标用户" class="info-row">
          {{ data.contractDetail._userGroup }}
        </el-form-item>
      </template>
    </el-form>

    <el-dialog
            :title="dialogTitle"
            ref="eventDialog"
            :visible.sync="showEventExecDialog"
            :before-close="handleCloseDialog"
            append-to-body
            :center=true
            width="40%">
      <component :is="eventComponent"
                 @close="closeDialogHandler"
                 :data="selectedContractEvent"></component>
    </el-dialog>


    <div v-if="data.contractDetail" style="margin-top: 15px;">
      <el-collapse :value="collapseName">
        <el-collapse-item title="合同流程" name="process">
          <contract-content style="padding-left:20px"
                            :data="data.contractDetail" @execute="executeContractHandler"></contract-content>
          <!--<contract-state class="contract-state-chart" :data="data.contractDetail"></contract-state>-->
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import PresentableDetail from './index.js'

  export default PresentableDetail
</script>

<style scoped lang="less">
  @import "index.less";
</style>

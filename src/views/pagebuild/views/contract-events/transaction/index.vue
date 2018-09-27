<template>
  <div class="contract-transaction-wrap">
    <el-alert
            v-if="showError"
            type="warning">
      未设置支付密码，<a :href="accountSecUrl" style="color: #409EFF;
" target="_blank">去设置</a>
    </el-alert>

    <el-form label-position="left" label-width="80px" :model="data" v-if="data">
      <el-form-item label="资源名称">
        {{data.resource.resourceName}}
      </el-form-item>
      <el-form-item label="资源类型">
        {{data.resource.resourceType}}
      </el-form-item>
      <el-form-item label="contractId">
        {{data.contract.contractId}}
      </el-form-item>
      <el-form-item label="甲方">
       {{data.contract.partyOneInfo && data.contract.partyOneInfo.nodeName}}
      </el-form-item>
      <el-form-item label="乙方">
        {{data.contract.partyTwoInfo && data.contract.partyTwoInfo.nickname}}
      </el-form-item>
      <el-form-item label="转入账号">
        {{data.event.params[0]}}
      </el-form-item>
      <el-form-item label="转账金额">
        {{data.event.params[1]|humanizeCurrency}} {{unitType}}
      </el-form-item>
      <el-form-item label="转出账号">
        <el-select v-model="fromAccountId" size="small" placeholder="请选择">
          <el-option
                  v-for="item in accounts"
                  :key="item.accountId"
                  :label="item.accountId"
                  :value="item.accountId">
          </el-option>
        </el-select>
        <el-tooltip placement="top">
          <div slot="content">
            <p><a style="color: white" :href="createPayAccountUrl" target="_blank">没有账号？去添加一个</a></p>
          </div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="支付密码">
        <el-input type="password" size="small" style="max-width: 300px;" v-model="password"
                  placeholder="请输入支付密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="doneHandler">取 消</el-button>
        <el-button type="primary" @click="pay">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import TransactionEvent from './index'

export default TransactionEvent
</script>

<style lang="less">
  @import "index.less";
</style>

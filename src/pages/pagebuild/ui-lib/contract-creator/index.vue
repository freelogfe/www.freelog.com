<template>
  <div class="contract-creator-wrap">
    <contract-steps></contract-steps>

    <contract-info-detail :data="data"></contract-info-detail>

    <el-table
            v-show="!data.contractDetail"
            :data="data.segments"
            stripe
            class="segments"
            style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <pre>{{props.row.detail._formatPolicyText || data._formatPolicyText}}</pre>
        </template>
      </el-table-column>
      <el-table-column
              label="策略名称"
              prop="detail.policyName">
      </el-table-column>
      <el-table-column
              label="目标用户"
              prop="detail._userGroup">
      </el-table-column>
      <el-table-column
              label="合同ID"
              prop="detail.segmentId">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-radio class="select-btn" v-model="selectedSegmentId"
                    :label="scope.row.detail.segmentId">选择
          </el-radio>
          <el-tooltip class="item" effect="dark" content="取消选择" placement="top"
                      v-show="selectedSegmentId===scope.row.detail.segmentId">
            <i class="el-icon-circle-close-outline"
               @click="cancelSegmentSelection(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="actions">
      <el-button @click="policyHandler"
                 v-loading="loading"
                 :type="btnType"
                 :disabled="!selectedSegmentId">{{btnType?'去执行合同': '创建合同'}}
      </el-button>
    </div>
  </div>
</template>

<script>
  import Policy from './index.js'

  export default Policy
</script>


<style lang="less" scoped>
  .segments {
    margin-top: 15px;
  }

  .actions {
    margin-top: 10px;
    text-align: center;
  }
</style>

<style>
  .contract-confirm-dialog {
    width: 600px;
  }
</style>
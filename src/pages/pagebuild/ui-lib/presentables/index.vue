<template>
  <div style="width: 100%">
    <el-table
            :data="presentables"
            stripe
            cell-class-name="presentable-cell">
      <el-table-column
              label="资源名称"
              min-width="300"
              prop="presentableName">
      </el-table-column>
      <!--<el-table-column-->
              <!--label="资源名称"-->
              <!--min-width="250"-->
              <!--prop="resourceInfo.resourceName">-->
      <!--</el-table-column>-->
      <el-table-column
              label="资源类型"
              prop="resourceInfo.resourceType"
              width="120">
      </el-table-column>
      <el-table-column
              min-width="120"
              align="center"
              label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row._statusInfo.type">{{scope.row._statusInfo.desc}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="tabActionHandler(scope.row, scope.$index)">
            {{CONTRACT_STATUS_ACTION_TIPS[scope.row._contractStatus]}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Presentables from './index.js'

  export default Presentables
</script>

<style lang="less">
  .presentable-cell {

  .cell {
    word-break: keep-all;
  }

  }
</style>
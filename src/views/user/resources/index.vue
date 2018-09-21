<template>
  <div class="my-resources-wrap">
    <el-form :inline="true" class="search-input-wrap">
      <el-form-item>
        <el-select v-model="searchForm.type"
                   size="small"
                   style="width: 80px"
                   placeholder="请选择">
          <el-option
                  v-for="item in searchTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input size="small"
                  style="width: 400px"
                  suffix-icon="el-icon-search"
                  placeholder="按回车搜索"
                  @keyup.native.enter="searchHandler"
                  v-model="searchForm.input"></el-input>
      </el-form-item>
    </el-form>

    <fl-pagination class="my-resource-list"
                   :config="tableConfig"
                   :rowClickHandler="rowClickHandler"
                   :pagination="paginationConfig">
      <template slot="list">
        <el-table-column
                label="资源|状态|类型">
          <template slot-scope="scope">
            <div>
              <p class="resource-name">{{ scope.row.resourceInfo.resourceName }}</p>
              <div>
                <span class="resource-status" :class="['status-'+scope.row.status]">{{ resolveStatus(scope.row.status) }}</span>
                <span class="resource-type">{{scope.row.resourceInfo.resourceType}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
                label="节点"
                width="200">
          <template slot-scope="scope">
            <div class="node-domain">
              {{formatNodeDomain(scope.row.nodeInfo.nodeDomain)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
                width="145"
                label="签约时间">
          <template slot-scope="scope">
            {{scope.row.createDate |fmtDate}}
          </template>
        </el-table-column>
      </template>
    </fl-pagination>
  </div>
</template>


<script>
import FlPagination from '@/components/Pagination/index.vue'

export default {
  name: 'my-resources',
  data() {
    return {
      searchForm: {
        type: 'resource',
        input: ''
      },
      searchTypes: [{
        value: 'node',
        label: '节点'
      }, {
        value: 'resource',
        label: '资源'
      }, {
        value: 'resourceType',
        label: '资源类型'
      }],

      tableConfig: {
        rowClassName: 'resource-row',
        'cell-class-name': 'res-row-cell'
      },
      paginationConfig: {
        target: '/qi/v1/getMyResources.json'
      }
    }
  },

  components: {
    FlPagination
  },

  mounted() {
    this.host = window.location.host.split('.').slice(1).join('.')
  },

  methods: {
    rowClickHandler(row) {
      this.$router.push({ path: `/resources/detail/${row.resourceId}` })
    },
    formatNodeDomain(domain) {
      return `${domain}.${this.host}`
    },
    resolveStatus(status) {
      let text
      switch (status) {
        case 1:
          text = '不可用'
          break
        case 2:
          text = '不可用'
          break
        case 3:
          text = '可用'
          break
        case 4:
        case 5:
        case 6:
          text = '合同终止'
          break
        default:
          text = '未知状态'
      }

      return text
    },
    searchHandler() {
      this.$message.warning('未开始设计')
    }
  }
}
</script>

<style lang="less">
  @import "index.less";
</style>

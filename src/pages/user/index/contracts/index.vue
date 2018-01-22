<template>
  <div class="contracts-wrap">
    <el-table
            :data="contracts"
            style="width: 100%">
      <el-table-column
              label="日期">
        <template slot-scope="scope">
          <a>{{ scope.row.createDate |fmtDate}}</a>
        </template>
      </el-table-column>
      <el-table-column
              prop="resourceDetail.resourceName"
              label="资源名">
      </el-table-column>
      <el-table-column
              prop="resourceDetail.resourceType"
              label="资源类型">
      </el-table-column>
      <el-table-column
              prop="address"
              label="合同状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row._status.type">{{scope.row._status.text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-dropdown split-button type="primary" @click="viewDetailHandler(scope.row)">
            详情
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>操作1</el-dropdown-item>
              <el-dropdown-item>操作2</el-dropdown-item>
              <el-dropdown-item>操作3</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import store from '@/lib/storage';
  import {CONTRACT_STATUS_TIPS, CONTRACT_STATUS_COLORS} from '@/config/contract'

  export default {
    name: 'contract-list',

    data() {
      return {
        contracts: [],
      }
    },
    mounted() {
      var user = store.get('userInfo')
      if (!user || !user.userId){return}
      this.loadContracts(user.userId)
        .then(this.loadResourcesDetail.bind(this))
        .then(this.format.bind(this))
        .then((contracts) => {
          this.contracts = contracts;
        })
    },
    methods: {
      format(contracts) {
        var result = []
        contracts.forEach((contract) => {
          if (contract.resourceDetail) {
            contract._status = {
              type: CONTRACT_STATUS_COLORS[contract.status],
              text: CONTRACT_STATUS_TIPS[contract.status]
            }
            result.push(contract)
          }
        })
        return result
      },
      viewDetailHandler(data) {
        location.href = `/pages/trade/detail.html?contractId=${data.contractId}`
      },
      loadResource(resourceId) {
        return new Promise((resolve) => {
          this.$axios.get(`/v1/resources/${resourceId}`).then((res) => {
            if (res.data.errcode === 0) {
              resolve(res.data.data)
            } else {
              resolve(null)
            }
          }).catch(() => {
            resolve(null)
          })
        })
      },
      loadResourcesDetail(contracts) {
        var promises = []
        contracts.forEach((contract) => {
          promises.push(this.loadResource(contract.resourceId))
        })

        return Promise.all(promises).then((resources) => {
          var srcMap = {}
          resources.forEach((r) => {
            if (r) {
              srcMap[r.resourceId] = r
            }
          })

          contracts.forEach((contract) => {
            contract.resourceDetail = srcMap[contract.resourceId] || null
          })

          return contracts
        })
      },
      loadContracts(userId) {
        return this.$axios.get('/v1/contracts', {
          params: {
            contractType: 3,
            partyTwo: userId
          }
        }).then((res) => {
          if (res.data.errcode === 0) {
            var data = res.data.data
            return (data && data.dataList) || [];
          } else {
            throw new Error(res.data.msg)
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
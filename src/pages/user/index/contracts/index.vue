<template>
  <div class="contracts-wrap">
    <el-table
            :data="contracts"
            style="width: 100%">
      <el-table-column
              prop="date"
              label="日期"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="资源名"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="费用">
        <template slot-scope="scope">
          <a>{{ scope.row.address }}</a>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-dropdown split-button type="primary" @click="viewDetailHandler">
            详情
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import store from '@/lib/storage';

  export default {
    name: 'contract-list',

    data() {
      return {
        contracts: [],
      }
    },
    mounted() {
      this.loadContracts()
        .then(this.format.bind(this))
        .then((contracts) => {
          this.contracts = contracts;
        })
    },
    methods: {
      format(data) {
        var contracts = (data && data.dataList) || []
        contracts.forEach((contract) => {
        })

        return contracts
      },
      viewDetailHandler() {

      },
      loadContracts() {
        var user = store.get('userInfo')
        return this.$axios.get('/v1/presentables', {
          params: {
            partyTwo: user.userId
          }
        }).then((res) => {
          if (res.data.errcode === 0) {
            return res.data.data;
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
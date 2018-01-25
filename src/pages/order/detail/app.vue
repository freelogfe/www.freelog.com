<template>
  <div id="main-app">
    <h3 style="margin-bottom: 15px">订单详情</h3>
    <el-form label-width="100px" v-if="orderDetail" class="small-el-form">
      <el-form-item label="支付订单ID" class="form-label">
        {{orderDetail.orderId}}
      </el-form-item>
      <el-form-item label="交易ID" class="form-label">
        {{orderDetail.transferId}}
      </el-form-item>
      <el-form-item label="资源名称" class="form-label">
        {{orderDetail.resource.resourceName}}
      </el-form-item>
      <el-form-item label="资源类型" class="form-label">
        {{orderDetail.resource.resourceType}}
      </el-form-item>
      <el-form-item label="资源类型" class="form-label">
        {{orderDetail.createDate | fmtDate}}
      </el-form-item>
      <el-form-item label="订单支付状态" class="form-label">
        {{orderDetail._statusInfo.desc}}
      </el-form-item>
      <el-form-item label="发起账户" class="form-label">
        {{orderDetail.sendAccountInfo.accountId}}
      </el-form-item>
      <el-form-item label="接收账户" class="form-label">
        {{orderDetail.receiveAccountInfo.accountId}}
      </el-form-item>
      <el-form-item label="转账金额" class="form-label">
        {{orderDetail.payAmount}} {{orderDetail.sendAccountInfo.accountId|currencyUnit}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import querystring from 'querystring'
  import OrderConfig from '@/config/order'
  import {mapGetters} from 'vuex'
  import {CONTRACT_STATUS_COLORS} from '@/config/contract'
  export default {
    data() {
      return {
        orderDetail: null
      }
    },
    mounted() {
      var qs = querystring.parse(location.search.slice(1))
      this.loadContracts()
        .then(this.loadResourcesDetail.bind(this))
        .then(this.format.bind(this))
        .then((contracts) => {
          this.contracts = contracts;
        })
    },
    computed: mapGetters({
      user: 'session'
    }),
    methods: {
      format(contracts) {
        var result = []
        contracts.forEach((contract) => {
          if (contract.resourceDetail) {
            contract._statusInfo = CONTRACT_STATUS_COLORS[contract.status]
            result.push(contract)
          }
        })
        return result
      },
      viewDetailHandler(data) {
        this.$message.info('开发中')
        location.href = `/pages/`
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
      loadContracts() {
        var user = this.user
        return this.$axios.get('/v1/contracts', {
          params: {
            contractType: 3,
            partyTwo: user.userId
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

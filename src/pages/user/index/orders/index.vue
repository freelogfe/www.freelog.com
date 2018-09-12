<template>
  <div class="contracts-wrap">
    <el-table
            :data="orders"
            style="width: 100%">
      <el-table-column
              label="日期">
        <template slot-scope="scope">
          <a>{{ scope.row.createDate |fmtDate}}</a>
        </template>
      </el-table-column>
      <el-table-column
              prop="contractDetail.resourceName"
              label="资源名">
      </el-table-column>
      <el-table-column
              prop="contractDetail.resourceType"
              label="资源类型">
      </el-table-column>
      <el-table-column
              prop="orderId"
              width="210"
              label="订单号">
      </el-table-column>
      <el-table-column
              prop="address"
              label="订单状态">
        <template slot-scope="scope">
          {{scope.row._statusInfo.desc}}
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
  import OrderConfig from '@/config/order'

  export default {
    name: 'user-order-list',

    data() {
      return {
        orders: [],
      }
    },
    mounted() {
      // this.loadOrders()
      //   .then(this.loadOrderDetail.bind(this))
      //   .then(this.format.bind(this))
      //   .then((orders) => {
      //     this.orders = orders || [];
      //   })
    },
    methods: {
      format(orders) {
        var result = []
        orders && orders.forEach((order) => {
          order._statusInfo = OrderConfig[order.status]
          result.push(order)
        })

        return result
      },
      loadResources(list) {
        var contractMap = {}
        var promises = list.map((item) => {
          contractMap[item.resourceId] = item
          return this.$axios.get(`/v1/resources/${item.resourceId}`).then((res) => {
            return res.data.data
          })
        })

        return Promise.all(promises).then((resources) => {
          resources.forEach((resource) => {
            if (contractMap[resource.resourceId]) {
              Object.assign(contractMap[resource.resourceId], resource)
            }
          })

          return Object.values(contractMap)
        })
      },
      mergeResinOrder(contracts, orders) {
        var ordersMap = {}
        orders.forEach((o) => {
          ordersMap[o.targetId] = o
        })

        contracts.forEach((contract) => {
          if (ordersMap[contract.contractId]) {
            ordersMap[contract.contractId].contractDetail = contract
          }
        })

        return Object.values(ordersMap)
      },
      loadOrderDetail(orders) {
        return new Promise((resolve) => {
          if (!orders) {resolve(null)}
          var contractIds = orders.map((o) => o.targetId)
          this.$axios.get(`/v1/contracts/contractRecords`, {
            params: {
              contractIds: contractIds.join(',')
            }
          }).then((res) => {
            if (res.data.errcode === 0) {
              return this.loadResources(res.data.data)
                .then((contracts) => {
                  return this.mergeResinOrder(contracts, orders)
                })
                .then(resolve)
            } else {
              resolve(null)
            }
          }).catch((err) => {
            console.error(err)
            resolve(null)
          })
        })
      },
      viewDetailHandler(order) {
        location.href = `/pages/order/detail.html?orderId=${order.orderId}`
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
      loadOrders() {
        return this.$axios.get('/v1/pay').then((res) => {
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
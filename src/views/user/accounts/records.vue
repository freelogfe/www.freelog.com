<template>
  <div class="account-transaction-records-view">
    <account-layout :title="navTitle" :showFooter="false">
      <div class="account-trans-records-wrap">
        <fl-pagination class="transaction-records"
                       :config="tableConfig"
                       :pagination="paginationConfig">
          <template slot="list">
            <el-table-column label="分类" align="center" width="70">
              <template slot-scope="scope">
                <div class="trans-type" :class="['trans-type-'+scope.row.tradeType]">
                  <i></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="交易时间" width="110">
              <template slot-scope="scope">
                <div class="trans-date">
                  <div class="trans-date-1">{{scope.row.createDate|fmtDate('yyyy-MM-dd')}}</div>
                  <div class="trans-date-2">{{scope.row.createDate|fmtDate('hh:mm')}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="300" label="名称|对方|流水号">
              <template slot-scope="scope">
                <div class="trans-target-info">
                  <p class="trans-target-name" :title="scope.row.tradeDesc">{{scope.row.tradeDesc}}</p>
                  <div class="trans-target-sub-name">
                    <span v-if="scope.row.targetInfo">{{resolveTargetInfoText(scope.row)}}</span>
                    <span :title="scope.row.tradeId">{{scope.row.tradeId}}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                    label="金额|币种"
                    align="right"
                    width="150">
              <template slot-scope="scope">
                <div class="trans-amount-info" :class="[resolveCurrencyClass(scope.row)]">
                <span>
                  <i class="minus-icon">-</i><i class="plus-icon">+</i>{{Math.abs(scope.row.amount)|humanizeCurrency(currencyInfo.abbr)}}</span>
                  <label>{{currencyInfo.abbr|toUpperCase}}</label>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="订单备注">
              <template slot-scope="scope">
                <div class="trans-remark" :title="scope.row.remark">
                  {{scope.row.remark}}
                </div>
              </template>
            </el-table-column>
          </template>
          <div slot="footer" class="footer-comment">
            注释：
            <ul>
              <li class="trans-type trans-type-1"><i></i>充值</li>
              <li class="trans-type trans-type-2"><i></i>转账</li>
              <li class="trans-type trans-type-3"><i></i>节点消费</li>
            </ul>
          </div>
        </fl-pagination>
      </div>
    </account-layout>
  </div>
</template>


<script>
import { resolveNodeDomain } from '@/lib/utils'
import AccountTypes from '@/config/account-types'
import FlPagination from '@/components/Pagination/index.vue'
import AccountLayout from '../layout.vue'

export default {
  name: 'account-transaction-records-view',

  data() {
    return {
      tableConfig: {
        rowClassName: 'resource-row',
        'cell-class-name': 'res-row-cell'
      },
      paginationConfig: {
        target: '/v1/pay/orders.json', // /v1/pay/paymentOrders
        params: {
          accountId: this.$route.query.accountId
        }
      }
    }
  },

  props: {},

  components: { AccountLayout, FlPagination },

  mounted() {
  },

  filters: {
    toUpperCase(value) {
      return value.toUpperCase().substring(1)
    }
  },

  watch: {

  },

  computed: {
    navTitle() {
      return `${this.currencyInfo.name}账户账单`
    },
    currencyInfo() {
      return AccountTypes[this.renderData.currencyType]
    },
    renderData() {
      return this.$route.query
    }
  },

  methods: {
    resolveCurrencyClass(row) {
      return row.afterBalance > row.beforeBalance ? 'plus-status' : 'minus-status'
    },
    resolveTargetInfoText(row) {
      let text = ''
      switch (row.correlativeInfo.accountType) {
        case 1:
          text = `账户名 ${row.targetInfo.nickName}`
          break
        case 2:
          text = `合同ID ${row.targetInfo.contractId}`
          break
        case 3:
          text = `节点 ${resolveNodeDomain(row.targetInfo.nodeDomain)}`
          break
        case 4:
          break
        default:
      }
      return text
    }
  }
}
</script>

<style lang="less" scoped type="text/less">
  @import "../../../styles/mixin.less";

  .account-transaction-records-view {
    .account-trans-records-wrap {
      width: 100%;
    }

    .trans-type {
      i {
        display: inline-block;
        width: 32px;
        height: 32px;
        background-size: 100%;
      }

      //充值
      &.trans-type-1 i {
        background-image: url("../../../assets/img/recharge.png");
      }

      //转账
      &.trans-type-2 i {
        background-image: url("../../../assets/img/transfer.png");
      }

      //支付
      &.trans-type-3 i {
        background-image: url("../../../assets/img/consume.png");
      }
    }

    .footer-comment {
      display: inline-block;
      font-size: 12px;
      color: #999999;
      ul, li {
        display: inline-block;
      }

      li {
        margin-right: 10px;
      }

      .trans-type i {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        vertical-align: text-bottom;
      }
    }

    .transaction-records {
      padding: 0 20px;
      .trans-date-1 {
        color: #222222;
        font-weight: bold;
      }

      .trans-date-2 {
        color: #999999;
      }

      .trans-target-info {
        .trans-target-name,
        .trans-target-sub-name {
          .text-ellipsis;
        }
      }

      .trans-remark {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .trans-target-name {
        color: #222222;
        font-weight: bold;
      }

      .trans-target-sub-name {
        color: #999999;
        span:first-child {
          padding-right: 5px;
          margin-right: 5px;
          border-right: 1px solid #999999;
        }
      }

      .trans-amount-info {
        font-size: 20px;
        font-weight: bold;
        i {
          display: none;
          margin-right: 3px;
        }
        label {
          color: #999999;
          font-size: 12px;
          font-weight: normal;
          margin-left: 10px;
        }
      }
      .minus-status {
        .minus-icon {
          display: inline;
        }
        span {
          color: #4396F0;
        }
      }

      .plus-status {
        .plus-icon {
          display: inline;
        }
        span {
          color: #E99331;
        }
      }
    }
  }
</style>

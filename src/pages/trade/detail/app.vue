<template>
  <div id="main-app">
    <h3 style="margin-bottom: 15px">合同详情</h3>
    <el-form label-width="100px" v-if="detail" class="small-el-form">
      <el-form-item label="合同ID" class="form-label">
        {{detail.contract.contractId}}
      </el-form-item>
      <el-form-item label="甲方" class="form-label">
        {{detail.contract.partyOne}}
      </el-form-item>
      <el-form-item label="乙方" class="form-label">
        {{detail.contract.partyTwo}}
      </el-form-item>
      <el-form-item label="资源名称" class="form-label">
        {{detail.resource.resourceName}}
      </el-form-item>
      <el-form-item label="资源类型" class="form-label">
        {{detail.resource.resourceType}}
      </el-form-item>
      <el-form-item label="合同创建时间" class="form-label">
        {{detail.contract.createDate | fmtDate}}
      </el-form-item>
      <el-form-item label="状态" class="form-label">
        {{detail._statusInfo.desc}}
      </el-form-item>

      <el-form-item label="状态" class="form-label">
        <pre>{{detail.contract.policySegment.segmentText}}</pre>
      </el-form-item>


      <!--<el-form-item label="发起账户" class="form-label">-->
        <!--{{detail.contract.accountId}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="接收账户" class="form-label">-->
        <!--{{detail.receiveAccountInfo.accountId}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="转账金额" class="form-label">-->
        <!--{{detail.payAmount}} {{unit}}-->
      <!--</el-form-item>-->
    </el-form>
  </div>
</template>

<script>
  import querystring from 'querystring'
  import {CONTRACT_STATUS_TIPS, CONTRACT_STATUS_COLORS} from '@/config/contract'

  export default {
    data() {
      return {
        detail: null
      }
    },
    mounted() {
      var qs = querystring.parse(location.search.slice(1))
      if (!qs.contractId) {
        this.$message.error('参数有误')
        setTimeout(() => {
          location.href = '/pages/user/index.html'
        }, 1e3)
        return
      }

      this.loadContract(qs.contractId)
        .then((contract) => {
          return this.loadResourcesDetail(contract.resourceId).then((resource) => {
            return {contract, resource}
          })
        })
        .then(this.format.bind(this))
        .then((detail) => {
          this.detail = detail;
        })
    },
    methods: {
      format(data) {
        data._statusInfo = CONTRACT_STATUS_COLORS[data.contract.status]
        return data
      },
      loadResourcesDetail(resourceId) {
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
      loadContract(contractId) {
        return this.$axios.get(`/v1/contracts/${contractId}`).then((res) => {
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

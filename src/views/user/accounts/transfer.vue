<template>
  <div class="account-transfer-view">
    <account-layout :title="navTitle">
      <el-form label-width="100px"
               :rules="rules"
               :model="form"
               ref="formRef"
               label-position="left">
        <el-form-item label="付款方账户ID">
          {{form.fromAccountId}}
          <!--<el-input size="small" v-model="form.fromAccountId" style="width: 300px"></el-input>-->
        </el-form-item>
        <el-form-item label="收款方账户ID">
          <el-input size="small" v-model="form.toAccountId"></el-input>
        </el-form-item>
        <el-form-item label="转账金额">
          <el-input size="small" v-model="form.amount" style="width: 100px"></el-input>
          <label>{{currencyInfo.abbr}}</label>
        </el-form-item>
        <el-form-item label="支付密码">
          <el-input size="small" v-model="form.password" type="password" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input size="small" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button class="ft-btn" type="primary" @click="transferHandler">转账</el-button>
      </template>
    </account-layout>
  </div>
</template>


<script>
import AccountTypes from '@/config/account-types'
import AccountLayout from '../layout.vue'

export default {
  name: 'account-transfer-view',

  data() {
    return {
      form: {
        fromAccountId: '',
        toAccountId: '',
        amount: '',
        password: '',
        remark: ''
      },
      rules: {
        fromAccountId: [{ required: true, message: '请输入付款方账户ID', trigger: 'blur' }],
        toAccountId: [{ required: true, message: '请输入收款方账户ID', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入转账金额', trigger: 'blur' }],
        password: [{ required: true, message: '请输入支付密码', trigger: 'blur' }]
      }
    }
  },

  props: {},

  components: { AccountLayout },

  mounted() {
    this.form.fromAccountId = this.renderData.accountId
  },

  computed: {
    navTitle() {
      return `${this.currencyInfo.name}转账`
    },
    currencyInfo() {
      return AccountTypes[this.renderData.currencyType]
    },
    renderData() {
      return this.$route.query
    }
  },

  methods: {
    transferHandler() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const form = Object.assign({}, this.form)
          form.amount *= this.currencyInfo.unit
          this.$axios.post('/v1/pay/transfer', form).then((res) => {
            const { data } = res
            if (data.ret === 0 && data.errcode === 0) {
              this.$message.success('转账成功')
              this.$router.push('/user/accounts')
            } else {
              this.$error.showErrorMessage(res)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped type="text/less">
  .account-transfer-view {
    label {
      color: #999999;
      margin-left: 10px;
    }
  }
</style>

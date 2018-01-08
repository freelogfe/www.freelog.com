<template>
  <div id="app">
    <el-form :model="transferForm" class="transfer-form" :rules="rules" ref="transferForm" label-width="100px">
      <el-form-item label="合同号" prop="targetId">
        <el-input v-model="transferForm.targetId" clearable></el-input>
      </el-form-item>
      <el-form-item label="发起账户" prop="fromAccountId">
        <el-select v-model="transferForm.fromAccountId" placeholder="请选择账户" style="width: 400px">
          <el-option :label="account.cardNo" :value="account.accountId" :key="account.accountId"
                     v-for="account in accounts"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接收账户" prop="toAccountId">
        <el-input v-model="transferForm.toAccountId" clearable></el-input>
      </el-form-item>
      <el-form-item label="转账金额" prop="amount">
        <el-input v-model="transferForm.amount">
          <template slot="append">feth</template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="showPayDialogHandler">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
            title="转账确认"
            :visible.sync="showPayDialog"
            width="30%">
      <el-form label-width="100px">
        <el-form-item label="发起账户" class="form-label">
          {{transferForm.fromAccountId}}
        </el-form-item>
        <el-form-item label="接收账户" class="form-label">
          {{transferForm.toAccountId}}
        </el-form-item>
        <el-form-item label="转账金额" class="form-label">
          {{transferForm.amount}} feth
        </el-form-item>
        <el-form-item label="合同ID" class="form-label">
          {{transferForm.targetId}}
        </el-form-item>
        <el-form-item label="订单类型" class="form-label">
          支付合同
        </el-form-item>
        <el-form-item label="支付密码">
          <el-input type="password" style="width: 90%"
                    v-model="transferForm.password"
                    placeholder="请输入密码"
                    clearable></el-input>
          <el-tooltip placement="left">
            <div slot="content" class="pay-pw-tips">
              <p><a href="/pages/account/security.html">忘记支付密码？去重置 ></a></p>
              <p><a href="/pages/account/security.html">没有创建支付密码？去创建 ></a></p>
            </div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-form-item>
      </el-form>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hidePayDialogHandler">取消支付</el-button>
        <el-button type="primary" @click="confirmTransfer" :loading="loading">确定支付</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  //http://doc.freelog.com/pay/%E5%8E%BB%E6%94%AF%E4%BB%98.html
  import querystring from 'querystring'

  export default {
    data() {
      var validateAmount = (rule, value, callback) => {
        var isNum = !isNaN(parseFloat(value))
        if (value === '') {
          callback(new Error('请输入转账金额'));
        } else if (!isNum) {
          callback(new Error('转账金额输入不合法'));
        } else if (value <= 0) {
          callback(new Error('转账金额不能为0'));
        } else {
          callback();
        }
      };

      return {
        showPayDialog: false,
        rules: {
          targetId: [{required: true, message: '请输入targetId', trigger: 'blur'}],
          fromAccountId: [{required: true, message: '请输入发起账户', trigger: 'blur'}],
          toAccountId: [{required: true, message: '请输入接收账户', trigger: 'blur'}],
          amount: [{required: true, message: '请输入转账金额', trigger: 'blur'},
            {validator: validateAmount, trigger: 'blur'},
          ]
        },
        loading: false,
        accounts: [],
        transferForm: {
          targetId: '',
          fromAccountId: '',
          toAccountId: '',
          amount: '',
          password: '',
          orderType: 1 //支付订单类型
        }
      }
    },
    mounted() {
      this.queryAccounts()
      this.autoFillForm()
    },
    methods: {
      autoFillForm() {
        var qs = querystring.parse(location.search.slice(1))

        Object.keys(this.transferForm).forEach((key) => {
          if (qs[key]) {
            this.transferForm[key] = qs[key]
          }
        })
      },
      showPayDialogHandler() {
        this.$refs.transferForm.validate((valid, err) => {
          if (valid) {
            this.showPayDialog = true;
          } else {
            console.log(err)
          }
        })
      },
      hidePayDialogHandler() {
        this.showPayDialog = false;
      },
      queryAccounts() {
        this.$axios.get('//api.freelog.com/v1/pay/accounts')
          .then((res) => {
            this.accounts = res.data.data
            console.log(this.accounts)
          })
      },
      confirmTransfer() {
        if (this.loading) {
          return
        }
        this.loading = true
        var data = Object.assign({}, this.transferForm)
        data.amount = data.amount / 1e3;
        this.$axios.post('//api.freelog.com/v1/pay', {
          data: data
        }).then((res) => {
          var data = res.data
          this.showPayDialog = false;
          this.loading = false
          if (data.ret === 0 && data.errcode === 0) {
            this.renderPayResult(data)
          } else {
            this.$message.error(data.msg)
          }
        }).catch(() => {
          this.loading = false
          this.showPayDialog = false;
        })
      },
      renderPayResult() {

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

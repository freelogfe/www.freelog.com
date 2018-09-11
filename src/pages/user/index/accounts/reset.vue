<template>
  <div class="account-reset-pay-password-view">
    <account-layout :title="navTitle">
      <el-form label-width="120px"
               :rules="rules"
               :model="form"
               ref="formRef"
               status-icon
               label-position="left">
        <el-form-item label="旧支付密码" prop="password">
          <el-input size="small" type="password" v-model="form.password" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="新支付密码" prop="newPassword">
          <el-input size="small" type="password" v-model="form.newPassword" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="确认支付密码" prop="checkNewPassword">
          <el-input size="small" type="password" v-model="form.checkNewPassword" style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button class="ft-btn" type="primary" @click="resetHandler">确定重置</el-button>
      </template>
    </account-layout>
  </div>
</template>


<script>
  import AccountLayout from '../layout'

  export default {
    name: 'account-reset-pay-password-view',

    data() {
      var reg = /^\d{6}$/;
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入6位数字'))
        } else {
          if (this.form.checkNewPassword !== '') {
            this.$refs.formRef.validateField('checkNewPassword');
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入6位数字'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };


      return {
        form: {
          password: '',
          newPassword: '',
          checkNewPassword: ''
        },
        rules: {
          password: [
            {required: true, message: '请输入支付密码', trigger: 'blur'},
            {min: 6, max: 6, message: '由6位数字组成', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入支付密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 6, message: '由6位数字组成', trigger: 'blur'}
          ],
          checkNewPassword: [
            {required: true, message: '请输入支付确认密码', trigger: 'blur'},
            {validator: validateCheckPass, trigger: 'change'},
            {min: 6, max: 6, message: '由6位数字组成', trigger: 'blur'}
          ]
        }
      }
    },

    props: {
      renderData: Object
    },
    components: {AccountLayout},

    mounted() {
      console.log(this.renderData)
    },

    computed: {
      navTitle() {
        return `重置${this.renderData.accountName}支付密码`
      }
    },

    methods: {
      resetHandler() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$axios.put(`/v1/pay/accounts/${this.renderData.accountId}`, {
              originalPassword: this.form.password,
              newPassword: this.form.newPassword
            }).then(res => {
              var data = res.data
              if (data.ret === 0 && data.errcode === 0) {
                this.$message.success('支付密码重置成功')
                this.$store.dispatch('changePanel', 'my-accounts')
              } else {
                this.$error.showErrorMessage(res.data.msg)
              }
            })
          } else {
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
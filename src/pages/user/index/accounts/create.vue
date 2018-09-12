<template>
  <div class="create-account-view">
    <account-layout :title="navTitle">
      <div class="create-account-input-wrap">
        <el-form label-width="100px"
                 ref="createForm"
                 :model="form"
                 label-position="left"
                 :rules="rules" status-icon>
          <el-form-item label="账户名称" prop="accountName">
            <el-input size="small" class="input-area" v-model="form.accountName"></el-input>
            <label class="input-tip">由2-20位字符组成</label>
          </el-form-item>
          <el-form-item label="支付密码" prop="password">
            <el-input size="small"
                      class="input-area"
                      type="password"
                      v-model="form.password"></el-input>
            <label class="input-tip">由6位数字组成</label>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input size="small"
                      class="input-area"
                      type="password"
                      v-model="form.checkPassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template slot="footer">
        <el-button class="ft-btn" type="primary" @click="createHandler">创建</el-button>
      </template>
    </account-layout>
  </div>
</template>


<script>
  import AccountLayout from '../layout'
  import accountTypes, {currentTypes} from '@/config/account-types'

  export default {
    name: 'account-create-view',

    data() {
      var reg = /^\d{6}$/;
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入6位数字'))
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.createForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入6位数字'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        form: {
          accountName: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          accountName: [
            {required: true, message: '请输入账户名称', trigger: 'blur'},
            {min: 2, max: 20, message: '由2-20位字符组成', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入支付密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 6, message: '由6位数字组成', trigger: 'blur'}
          ],
          checkPassword: [
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
      currencyTypeInfo() {
        return accountTypes[this.renderData.currencyType || '1']
      },
      navTitle() {
        return `创建${this.currencyTypeInfo.name}账户`
      }
    },

    methods: {
      cancelHandler() {
        this.goBack()
      },
      goBack() {
        this.$store.dispatch('changePanel', 'my-accounts')
      },
      createHandler() {
        this.$refs.createForm.validate((valid) => {
          if (valid) {
            this.$axios.post('/v1/pay/accounts', {
              accountName: this.form.accountName,
              currencyType: this.currencyTypeInfo.value,
              password: this.form.password
            }).then((res) => {
              var result = res.data
              if (result.ret === 0 && result.errcode === 0) {
                this.$message.success('创建成功')
                this.goBack()
              } else {
                this.$message.error(result.msg || '操作失败')
              }
            })
          } else {
            console.log('error submit!!');
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "create.less";
</style>
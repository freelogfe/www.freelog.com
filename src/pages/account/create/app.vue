<template>
  <div id="main-app">
    <div class="create-account-container">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>账户管理</el-breadcrumb-item>
          <el-breadcrumb-item>创建飞致币绑定地址</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-main>
        <el-form :model="accountForm" status-icon :rules="accountRule" ref="accountForm" label-width="120px">
          <el-form-item label="账户类型" prop="accountType" required>
            <el-select v-model="accountForm.accountType" placeholder="请选择账户类型">
              <el-option
                      v-for="item in accountTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <!--后端会创建一个飞致币托管地址，跟此账户地址绑定-->
          <el-form-item label="外部账户地址" prop="address"
                        :required="accountForm.accountType==1">
            <el-input v-model="accountForm.address"
                      :placeholder="addrPlaceholder"></el-input>

            <el-popover
                    ref="popover"
                    placement="top"
                    trigger="hover"
                    width="160">
              <div style="text-align: center">
                <a @click="showCreateEthDialog" href="javascript:;">去创建一个</a>
              </div>
            </el-popover>
            <span v-popover:popover>没有以太坊地址<i class="el-icon-question"></i></span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="createAccount('accountForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </div>

    <el-dialog
            title="创建以太坊地址"
            :visible.sync="shouldShowCreateDialog"
            width="40%"
            :before-close="handleClose">
      <h3 style="margin-bottom: 20px;text-align: center">请设置以太坊支付密码</h3>
      <el-form :model="createEthForm" status-icon
               :rules="createEthRules"
               ref="createEthForm"
               label-width="120px"
               class="demo-ruleForm">
        <el-form-item label="支付密码" prop="pass" required>
          <el-input type="password" v-model="createEthForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认支付密码" prop="checkPass" required>
          <el-input type="password" v-model="createEthForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createEthAccount">提交</el-button>
          <el-button type="primary" @click="shouldShowCreateDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
  import AccountTypes from '@/config/account-types'

  export default {
    data() {
      const types = Object.values(AccountTypes).map((type) => {
        type.label = type.name
        return type
      })

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.createEthForm.checkPass !== '') {
            this.$refs.createEthForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.createEthForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        createEthForm: {
          pass: '',
          checkPass: ''
        },
        createEthRules: {
          pass: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, message: '最少6个字符', trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'change'},
            {min: 6, message: '最少6个字符', trigger: 'blur'}
          ]
        },
        shouldShowCreateDialog: false,
        accountTypes: types,
        accountForm: {
          address: '',
          accountType: ''
        },
        accountRule: {}
      }
    },
    computed: {
      addrPlaceholder: function () {
        var msg
        switch (this.accountForm.accountType) {
          case 1:
            msg = '请输入以太坊地址'
            break;
          default:
            msg = '请输入外部账户地址'
        }

        return msg
      }
    },
    mounted() {

    },
    methods: {
      handleClose(done) {
        this.$refs['createEthForm'].resetFields()
        done()
      },
      showCreateEthDialog() {
        this.shouldShowCreateDialog = true
      },
      setAccountAddr(address) {
        this.accountForm.address = address
      },
      createEthAccount() {
        this.$refs['createEthForm'].validate((valid) => {
          if (valid) {
            this.$axios.post('/v1/pay/accounts/createEthAccount', {
              password: this.createEthForm.pass
            }).then((res) => {
              var result = res.data
              if (result.ret === 0 && result.errcode === 0) {
                this.setAccountAddr(result.data.address)
                this.$message.success('创建成功')
              } else {
                this.$message.error(result.msg || '创建失败')
              }
              this.shouldShowCreateDialog = false
            })
          } else {
            console.log('error submit!!');
          }
        });
      },
      createAccount(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid);
            this.$axios.post('/v1/pay/accounts', this.accountForm)
              .then((res) => {
                var result = res.data
                if (result.ret === 0 && result.errcode === 0) {
                  this.$message.success('创建成功')
                  setTimeout(() => {
                    location.href = `/pages/account/detail.html?accountId=${result.data.accountId}`
                  }, 5e2)
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
<style lang="less">
  @import "app.less";
</style>

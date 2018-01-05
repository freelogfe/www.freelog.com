<template id="accountManagement">
  <div id="app">
    <ul class="setting-items">
      <li>
        <span class="setting-title"><label>支付密码</label><i class="el-icon-fa-lock"></i></span>
        <span class="setting-desc"></span>
        <div class="setting-action">
          <el-button type="text" @click="resetPayPasswordHandler">重置</el-button>
          <el-button type="text" @click="createPayPasswordHandler">创建</el-button>
        </div>
      </li>
      <li>
        <span class="setting-title"><label>登录密码</label><i class="el-icon-fa-lock"></i></span>
        <el-button class="setting-action" type="text" @click="resetLoginPasswordHandler">重置</el-button>
      </li>
    </ul>
    <el-dialog
            :title="passwordForm.title"
            :visible.sync="shouldShowPasswordDialog"
            width="30%"
            :before-close="handleClose"
            center>
      <el-form label-width="100px" status-icon :model="passwordForm" :rules="passwordRules" ref="passwordForm">
        <el-form-item label="旧密码" prop="oldPassword" v-show="/^reset/.test(passwordForm.type)">
          <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkNewPassword">
          <el-input type="password" v-model="passwordForm.checkNewPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shouldShowPasswordDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import store from '@/lib/storage'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passwordForm.newPassword !== '') {
            this.$refs.passwordForm.validateField('checkNewPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        resetPayPasswordDialog: false,
        shouldShowPasswordDialog: false,
        passwordRules: {
          newPassword: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkNewPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        },
        passwordForm: {
          title: '',
          type: '',
          oldPassword: '',
          newPassword: '',
          checkNewPassword: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      resetPayPasswordHandler() {
        this.shouldShowPasswordDialog = true
        this.passwordForm.title = '重置支付密码'
        this.passwordForm.type = 'resetPayPassword'
      },
      resetLoginPasswordHandler() {
        this.shouldShowPasswordDialog = true
        this.passwordForm.title = '重置登录密码'
        this.passwordForm.type = 'resetLoginPassword'
      },
      createPayPasswordHandler() {
        this.shouldShowPasswordDialog = true
        this.passwordForm.title = '创建支付密码'
        this.passwordForm.type = 'createPayPassword'
      },
      handleClose(done) {
        this.$refs.passwordForm.resetFields();
        done()
      },
      routeToPathHandler(path) {
        location.href = path
      },
      confirmHandler() {
        var fnName = this.passwordForm.type;
        this[fnName]()
          .then(() => {
            this.shouldShowPasswordDialog = false
          })
          .catch((err) => {
            var msg = (err && err.message) || err || '出错啦！'
            this.$message.error(msg)
          })
      },
      resetLoginPassword() {
        var user = store.get('userInfo')
        if (!user || !user.userId) {
          return this.$message.error('not login')
        }
        var data = {
          loginName: user.loginName,
          password: this.passwordForm.newPassword
        };
        return this.$axios.post(`//api.freelog.com/v1/userinfos/resetPassword`, {
          data: data
        }).then((res) => {
          var result = res.data
          if (result.ret === 0 && result.errcode === 0) {
            this.$message.success('设置成功')
          } else {
            throw new Error(result.msg)
          }
        })
      },
      createPayPassword() {
        var data = {
          password: this.passwordForm.newPassword
        };
        return this.$axios.post(`//api.freelog.com/v1/pay/password`, {
          data: data
        }).then((res) => {
          var result = res.data
          if (result.ret === 0 && result.errcode === 0) {
            this.$message.success('设置成功')
          } else {
            throw new Error(result.msg)
          }
        })
      },
      resetPayPassword() {
        var user = store.get('userInfo')
        if (!user || !user.userId) {
          return this.$message.error('not login')
        }

        var data = {
          oldPassword: this.passwordForm.oldPassword,
          newPassword: this.passwordForm.newPassword,
        };
        return this.$axios.put(`//api.freelog.com/v1/pay/password/${user.userId}`, {
          data: data
        }).then((res) => {
          var result = res.data
          if (result.ret === 0 && result.errcode === 0) {
            this.$message.success('重置成功')
          } else {
            throw new Error(result.msg)
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "app.less";
</style>

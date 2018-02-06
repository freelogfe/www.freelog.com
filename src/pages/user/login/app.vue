<template>
  <div class="login-wrapper">
    <div class="login-section">
      <header class="login-header">
        <el-alert v-if="error" :title="error.title" type="warning" :description="error.message" show-icon/>
      </header>
      <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="loginForm"
               label-width="0">
        <h2 class="heading">用户登录</h2>
        <el-form-item prop="loginName">
          <el-input type="text" v-model="model.loginName" placeholder="请输入用户名">
            <template slot="prepend">
              <i class="fa fa-user" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="model.password" placeholder="请输入密码"
                    @keyup.native.enter="submit('loginForm')">
            <template slot="prepend">
              <i class="fa fa-unlock-alt" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="model.isRememer">记住我</el-checkbox>
          <span class="user-ops">
          <a class="user-op" href="//console.freelog.com/user/reset_pw">忘记密码</a> | <a class="user-op"
                                                                                      href="//console.freelog.com/user/signup?redirect=%2F%2Fwww.freelog.com%2Fpages%2Fuser%2Findex.html">注册新用户</a>
        </span>
        </el-form-item>
        <el-form-item class="login-btns">
          <el-button type="primary"
                     style="width: 100%;"
                     :loading="loading"
                     @click="submit('loginForm')">{{ loading ? '登陆中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import store from '@/lib/storage';
  import querystring from 'querystring'

  export default {
    name: 'login',

    data() {
      var validateLoginName = (rule, value, callback) => {
        if (value) {
          const EMAIL_REG = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          const PHONE_REG = /^1[34578]\d{9}$/
          if (!EMAIL_REG.test(value) && !PHONE_REG.test(value)) {
            callback(new Error('账号格式有误，输入正确的手机号或邮箱'));
          } else {
            callback()
          }
        } else {
          callback(new Error('账号不能为空'));
        }
      };

      const rules = {
        loginName: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {validator: validateLoginName, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
        ]
      };

      return {
        model: {
          loginName: '',
          password: '',
          isRememer: false,
        },
        rules: rules,
        error: null,
        loading: false
      }
    },
    mounted() {
    },

    methods: {
      submit(ref) {
        var self = this;
        this.$refs[ref].validate(valid => {
          if (!valid) {
            return false
          }

          this.error = null
          this.loading = true;

          var data = Object.assign({}, self.model)
          data.isRememer = data.isRememer ? 1 : 0
          this.$store.dispatch('userLogin', data)
            .then(() => {
              this.loading = false
              var qs = querystring.parse(location.search.slice(1))
              location.href = qs.redirect || '/pages/user/index.html'
            })
            .catch((msg) => {
              this.loading = false
              this.error = {message: msg}
            })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>

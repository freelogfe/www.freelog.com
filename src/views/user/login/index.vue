<template>
  <section class="login-section">
    <header class="login-header">
      <!--<h1 class="brand">-->
      <!--<router-link to="/" tabindex="-1">freelog.com</router-link>-->
      <!--</h1>-->
      <el-alert v-if="error" :title="error.title" type="warning" :description="error.message" show-icon/>
    </header>
    <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="loginForm" label-width="0">
      <h2 class="heading">用户登录</h2>
      <el-form-item prop="loginName">
        <el-input type="text" v-model="model.loginName" name="username" placeholder="请输入用户名">
          <template slot="prepend">
            <i class="fa fa-user" aria-hidden="true"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="model.password" name="password" placeholder="请输入密码"
                  @keyup.native.enter="submit('loginForm')">
          <template slot="prepend">
            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="rememberUser">记住我</el-checkbox>
        <span class="user-ops">
          <router-link to="/reset_pw" class="user-op">忘记密码</router-link> | <router-link class="user-op" :to="signUpLink">注册新用户</router-link>
        </span>
      </el-form-item>
      <el-form-item class="login-btns">
        <el-button type="primary"
                   style="width: 100%;"
                   :loading="loading"
                   class="js-login-btn"
                   @click="submit('loginForm')">{{ loading ? '登陆中...' : '登录' }}
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import {isSafeUrl} from "../../../lib/security";

  export default {
    name: 'freelog-ui-login',

    data() {
      const validateLoginName = function (rule, value, callback) {
        if (value) {
          const EMAIL_REG = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          const PHONE_REG = /^1[34578]\d{9}$/
          if (!EMAIL_REG.test(value) && !PHONE_REG.test(value)) {
            callback(new Error('账号格式有误，输入正确的手机号或邮箱'))
          } else {
            callback()
          }
        } else {
          callback(new Error('账号不能为空'))
        }
      }

      const rules = {
        loginName: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          { validator: validateLoginName, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '长度至少6个字符', trigger: 'blur'}
        ]
      }
      var loginName = window.localStorage.getItem('loginName') || ''

      return {
        model: {
          loginName: loginName,
          password: '',
        },
        signUpLink: '/signup',
        rules,
        error: null,
        loading: false,
        rememberUser: false
      }
    },
    mounted() {
      const redirect = this.$route.query.redirect


      this.$store.dispatch('checkUserSession').then((isLogined) => {
        if (isLogined) {
          this.redirect()
        } else if (isSafeUrl(redirect)) {
          this.signUpLink += `?redirect=${redirect}`
        }
      })
    },

    methods: {
      redirect() {
        const redirect = this.$route.query.redirect
        if (isSafeUrl(redirect)) {
          window.location.replace(redirect)
        } else {
          this.$router.replace('/')
        }
      },
      submit(ref) {
        const self = this
        this.$refs[ref].validate((valid) => {
          if (!valid) {
            return false
          }

          this.error = null
          this.loading = true

          const data = Object.assign(this.model, {
            isRememer: this.rememberUser ? 1 : 0
          })

          this.$store.dispatch('userLogin', data)
            .then(() => {
              window.localStorage.setItem('loginName', data.loginName)
              const redirect = this.$route.query.redirect
              if (isSafeUrl(redirect)) {
                window.location.replace(redirect)
              } else {
                self.$router.replace('/')
              }
              self.loading = false
            })
            .catch((err) => {
              console.log(err)
              if (typeof err === 'string') {
                self.error = {title: '', message: err}
              } else {
                self.error = {title: '发生错误', message: err.response.errorMsg || '出现异常，请稍后再试！'}
                switch (err.response && err.response.status) {
                  case 401:
                    self.error.message = '用户名或密码错误！'
                    break
                  case 500:
                    self.error.message = '服务器内部异常，请稍后再试！'
                    break
                }
              }
              self.loading = false
            })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-section {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    height: auto;

    .heading {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }

    .user-ops {
      float: right;
      .user-op {
        color: #1f2d3d;
        &:hover {
          color: #35b5ff;
        }
      }
    }
    .login-btns {
      text-align: center;
    }
  }
</style>

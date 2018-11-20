import { storage } from '@/lib'
import { validateLoginName } from '../login/validator'
import { isSafeUrl } from '@/lib/security'

export default {
  name: 'signup',

  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.model.checkPassword !== '') {
          this.$refs.signupForm.validateField('checkPassword')
        }
        callback()
      }
    }

    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.model.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    const rules = {
      loginName: [
        { required: true, message: '请输入账号名', trigger: 'blur' },
        { validator: validateLoginName, trigger: 'blur' }
      ],
      nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatePassword, trigger: 'blur' },
        { min: 6, message: '长度至少6个字符', trigger: 'blur' }
      ],
      checkPassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        { validator: validateCheckPassword, trigger: 'blur' },
        { min: 6, message: '长度至少6个字符', trigger: 'blur' }
      ]
    }
    const model = {
      loginName: '',
      nickname: '',
      password: '',
      checkPassword: ''
    }
    return {
      model,
      rules,
      error: null,
      loading: false,
      logining: false,
    }
  },

  methods: {
    login() {
      const self = this
      let redirect = this.$route.query.redirect
      const isNewPage = /^(https?:)?\/\//.test(redirect)
      const data = {
        loginName: this.model.loginName,
        password: this.model.password,
        jwtType: isNewPage ? 'cookie' : 'header'
      }

      if (!redirect || !isSafeUrl(redirect)) {
        redirect = '/'
      }

      self.logining = true
      this.$store.dispatch('userLogin', data)
        .then(() => {
          storage.set('loginName', data.loginName)
          if (isNewPage) {
            location.replace(redirect)
          } else {
            self.$router.replace(redirect || '/')
          }
        })
        .catch((_) => {
          self.logining = false
        })
    },
    submit(ref) {
      if (this.loading) {
        return
      }

      this.$refs[ref].validate((valid) => {
        if (!valid) {
          return false
        }

        this.error = null
        this.loading = true

        const data = {}

        Object.keys(this.model).forEach((key) => {
          (key !== 'checkPassword') && (data[key] = this.model[key])
        })

        this.$axios.post('/v1/userinfos/register',data)
          .then((res) => {
            if (res.data.errcode === 0) {
              this.$message.success('注册成功')
              this.login()
            } else {
              this.$message.error(res.data.msg)
            }
            this.loading = false
          })
          .catch((err) => {
            this.error = { title: '发生错误', message: '出现异常，请稍后再试！' }
            switch (err.response && err.response.status) {
              case 401:
                this.error.message = '用户名或密码错误！'
                break
              case 500:
                this.error.message = '服务器内部异常，请稍后再试！'
                break
            }
            this.loading = false
          })
      })
    }
  }
}

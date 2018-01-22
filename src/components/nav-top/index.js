import store from '@/lib/storage';

export default {
  name: 'nav-top-bar',
  data() {
    return {
      user: store.get('userInfo') || {},
    }
  },
  mounted() {
    this.checkLoginStatus() //待优化
  },
  methods: {
    checkLoginStatus() {
      if (!this.user || !this.user.userId) {
        this.loadUserInfo().then((res) => {
          var data = res.data
          if (res.errcode === 0) {
            store.set('userInfo', data)
            return data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    loadUserInfo() {
      return this.$axios.get('/v1/userinfos/current').then(function (res) {
        return res.data;
      })
    },
    logoutHandler() {
      this.$axios.get('/v1/passport/logout').then(function (res) {
        store.remove('userInfo')
        location.replace('/pages/user/login.html')
      })
    },
    handleNavTopCommand(command) {
      switch (command) {
        case 'gotoAccountSetting':
          location.href = '/pages/account/security.html'
          break;
      }
    }
  }
}
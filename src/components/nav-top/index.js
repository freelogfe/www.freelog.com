import store from '@/lib/storage';

export default {
  name: 'nav-top-bar',
  data() {
    return {
      user: store.get('userInfo') || {},
    }
  },
  mounted() {
    this.checkLoginStatus()
  },
  methods: {
    checkLoginStatus() {
      if (!this.user.userId) {
        location.replace('/pages/user/login.html')
      }
    },
    logoutHandler() {
      this.$axios.get('//api.freelog.com/v1/passport/logout').then(function (res) {
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
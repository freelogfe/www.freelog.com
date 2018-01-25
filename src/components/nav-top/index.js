import {mapGetters} from 'vuex'

export default {
  name: 'nav-top-bar',
  data() {
    return {
    }
  },
  computed: mapGetters({
    user: 'session'
  }),
  mounted() {
    this.checkLoginStatus() //待优化
  },
  methods: {
    checkLoginStatus() {
      if (!this.user || !this.user.userId) {
        this.$vuex.dispatch('checkUserSession')
          .then((userInfo) => {
            this.user = userInfo
          })
      }
    },
    logoutHandler() {
      this.$axios.get('/v1/passport/logout').then(() => {
        this.$vuex.dispatch('logout')
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
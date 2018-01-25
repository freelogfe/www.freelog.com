import {mapGetters} from 'vuex'

export default {
  name: 'nav-top-bar',
  data() {
    return {}
  },
  computed: mapGetters({
    userInfo: 'session'
  }),
  mounted() {
    this.checkLoginStatus()
  },
  methods: {
    checkLoginStatus() {
      if (!this.user || !this.user.userId) {
        this.$vuex.dispatch('checkUserSession')
          .then((userInfo) => {
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
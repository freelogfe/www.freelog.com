import { mapGetters } from 'vuex'

export default {
  name: 'user-aside-nav',
  data() {
    return {
      activeNavName: 'my-profile',
      navs: [
        {
          title: '我的关注',
          name: 'my-collections',
          link: 'collections'
        },
        {
          title: '我的资源',
          name: 'my-resources',
          link: 'resources'
        },
        {
          title: '我的账户',
          name: 'my-accounts',
          link: 'accounts'
        },
        {
          title: '资料与账号',
          name: 'my-profile',
          link: 'profile'
        }
      ]
    }
  },

  computed: mapGetters({
    user: 'session'
  }),

  watch: {
    $route() {
      this.resolveCurrentNav()
    }
  },

  mounted() {
    if (!this.user || !this.user.userId) {
      this.$vuex.dispatch('getCurrentUserInfo').then(() => {

      })
    }
    this.resolveCurrentNav()
  },
  methods: {
    resolveCurrentNav() {
      const curPath = this.$route.fullPath
      for (let i = 0; i < this.navs.length; i += 1) {
        const nav = this.navs[i]
        if (curPath.indexOf(nav.link) > -1) {
          this.activeNavName = nav.name
          break
        }
      }
    },
    switchNavHandler(navItem) {
      this.activeNavName = navItem.name
      this.changePanel()
    },
    changePanel() {
      let curNav
      for (let i = 0; i < this.navs.length; i += 1) {
        const nav = this.navs[i]
        if (nav.name === this.activeNavName) {
          curNav = nav
          break
        }
      }

      if (curNav) {
        this.$router.push(`/${curNav.link}`)
      }
    },
    gotoMyProfile() {
      this.activeNavName = 'my-profile'
      this.changePanel()
    }
  }
}

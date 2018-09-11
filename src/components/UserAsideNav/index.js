import {mapGetters} from 'vuex'

export default {
  name: 'user-aside-nav',
  data() {
    return {
      activeNavName: 'my-accounts',
      navs: [
        {
          title: '我的关注',
          name: 'my-collections'
        },
        {
          title: '我的资源',
          name: 'my-resources'
        },
        {
          title: '我的账户',
          name: 'my-accounts'
        },
        {
          title: '资料与账号',
          name: 'my-profile'
        }
      ]
    }
  },

  computed: mapGetters({
    user: 'session'
  }),

  mounted() {
    if (!this.user || !this.user.userId) {
      this.$vuex.dispatch('getCurrentUserInfo').then((user) => {
        this.changePanel()
      })
    }
  },
  methods: {
    switchNavHandler(navItem) {
      this.activeNavName = navItem.name
      this.changePanel()
    },
    changePanel(){
      this.$store.dispatch('changePanel', this.activeNavName)
    }
  }
}
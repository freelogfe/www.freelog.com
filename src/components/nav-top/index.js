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
    this.syncUserSession()
    this.listenWindowVisibility()
  },
  methods: {
    listenWindowVisibility() {
      var hidden = 'hidden';
      var doc = document
      var self = this;
      if (hidden in doc)
        doc.addEventListener('visibilitychange', onchange);
      else if ((hidden = 'mozHidden') in doc)
        doc.addEventListener('mozvisibilitychange', onchange);
      else if ((hidden = 'webkitHidden') in doc)
        doc.addEventListener('webkitvisibilitychange', onchange);
      else if ((hidden = 'msHidden') in doc)
        doc.addEventListener('msvisibilitychange', onchange);
      else
        window.onpageshow = window.onpagehide
          = window.onfocus = window.onblur = onchange;

      function onchange(evt) {
        var v = 'visible';
        var h = 'hidden';
        var evtMap = {
          focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
        };
        var type

        evt = evt || window.event;
        if (evt.type in evtMap) {
          type = evtMap[evt.type];
        } else {
          type = this[hidden] ? 'hidden' : 'visible';
        }

        if (type === 'visible') {
          self.syncUserSession()
        }
      }
    },
    syncUserSession() {
      this.$store.dispatch('checkUserSession')
        .then((valid) => {
          if (!valid) {
            this.$store.dispatch('getCurrentUser').then(() => {
              location.reload()
            })
          }
        })
    }
    ,
    logoutHandler() {
      this.$axios.get('/v1/passport/logout').then(() => {
        this.$vuex.dispatch('userLogout').then(() => {
          setTimeout(() => {
            location.replace('/pages/user/login.html')
          }, 20)
        })
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
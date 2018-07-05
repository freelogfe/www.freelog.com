export default {
  name: 'tool-bar',
  data() {
    return {
      hidden: true,
      profileUrl: `//www.${G_FreelogConfig.mainDomain}/pages/user/index.html`
    }
  },
  mounted() {
    this.initHotKeyEvent()
  },
  methods: {
    //ctrl+T唤起工具栏
    initHotKeyEvent() {
      var keyCodes = {
        ctrl: 17,
        T: 84
      };
      var keydown = {}
      var self = this;
      var isCtrlT = (keyCode) => (keyCodes.ctrl === keyCode || keyCodes.T === keyCode)
      window.addEventListener('keydown', function (ev) {
        if (isCtrlT(ev.keyCode)) {
          keydown[ev.keyCode] = true
          if (keydown[keyCodes.ctrl] && keydown[keyCodes.T]) {
            self.toggleToolBar()
            keydown = {}
          }
        }
      })

      window.addEventListener('keyup', function (ev) {
        if (isCtrlT(ev.keyCode)) {
          keydown[ev.keyCode] = false
        }
      })
    },
    showAuthDialog() {
      window.FreeLogApp.trigger(window.FreeLogApp.EventCode.showSystemDialog, {
        callback: function () {
          console.log('close dialog@toolbar')
        }
      })
    },
    toggleToolBar() {
      this.hidden = !this.hidden
    },
    show() {
      this.hidden = false
    },
    hide() {
      this.hidden = true
    }
  }
}
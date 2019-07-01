
export default {
  init({ loadingInstance }) {
    this.loadingInstance = loadingInstance
    this.start()
  },
  start() {
    const self = this
    const authInfo = window.__auth_info__
    const authErrorData = authInfo && authInfo.__auth_error_info__
    if (!authErrorData) {
      self.loadWidgets()
    } else {
      window.FreelogApp.trigger(
        window.FreelogApp.eventNames.HANDLE_INVALID_RESPONSE,
        { response: authErrorData },
        (presentable) => {
          if (presentable._contractStatus === 3) {
            window.location.reload() // 后续考虑局部更新？
          }
        }
      )
      self.hideLoading()
    }
  },
  hideLoading() {
    this.loadingInstance.close()
  },
  getWidgets() {
    const $page = document.querySelector('#js-page-container')
    return $page.querySelectorAll('.js-wc-widget')
  },
  loadWidgets() {
    if (!window.__auth_info__) {
      console.error('no auth info output')
    }
    const self = this
    const $widgets = this.getWidgets()
    const promises = []
    const vis = {}
    Array.from($widgets).forEach((widget) => {
      const subReleaseId = widget.getAttribute('data-widget-src')
      const pbId = widget.getAttribute('data-page-build-id')
      const version = '0.1.0'
      if (subReleaseId && !vis[subReleaseId]) {
        vis[subReleaseId] = true
        const p = window.FreelogApp.QI.loadSubResource({
          presentableId: pbId, subReleaseId, version
        })
        promises.push(p)
      } else {
        console.warn('没有找到对应的组件ID')
      }
    })

    if (promises.length) {
      Promise.all(promises).then(() => {
        self.hideLoading()
      }).catch((err) => {
        self.hideLoading()
        console.error(err)
      })
    } else {
      self.hideLoading()
    }
  }
}

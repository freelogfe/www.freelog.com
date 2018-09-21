
export default {
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
    document.body.querySelector('#js-page-container').classList.remove('freelog-app-loading')
  },
  getWidgets() {
    const $page = document.querySelector('#js-page-container')
    return $page.querySelectorAll('.js-wc-widget')
  },
  loadWidgets() {
    const self = this
    const $widgets = this.getWidgets()
    const promises = []
    const vis = {}
    Array.from($widgets).forEach((widget) => {
      const token = widget.getAttribute('data-widget-token')
      const srcId = widget.getAttribute('data-widget-src')
      if (token && srcId && !vis[srcId]) {
        vis[srcId] = true
        // var url = `/api/v1/auths/presentable/subResource/${srcId}?token=${token}`
        const p = window.FreelogApp.QI.requireSubResource(srcId, token)
        promises.push(p)
      } else {
        // console.warn('没有找到对应的组件ID')
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

import * as helpers from '@/lib/freelog-core/utils/helpers.js'
export default {
  start() {
    var self = this
    var authInfo = window.__auth_info__;
    var authErrorData = authInfo && authInfo.__auth_error_info__
    if (!authErrorData) {
      self.loadWidgets()
    } else {
      window.FreeLogApp.handleErrorResponse(authErrorData, (presentable) => {
        if (presentable._contractStatus === 3) {
          location.reload()  //后续考虑局部更新？
        }
      });
      self.hideLoading()
    }
  },
  hideLoading() {
    document.body.querySelector('#js-page-container').classList.remove('freelog-app-loading');
  },
  getWidgets() {
    var $page = document.querySelector('#js-page-container')
    return $page.querySelectorAll('.js-wc-widget');
  },
  loadWidgets() {
    var self = this;
    var $widgets = this.getWidgets()
    var promises = [];
    var vis = {}
    Array.from($widgets).forEach(widget => {
      var token = widget.getAttribute('data-widget-token');
      var srcId = widget.getAttribute('data-widget-src');
      if (token && srcId && !vis[srcId]) {
        vis[srcId] = true
        // var url = `/api/v1/auths/presentable/subResource/${srcId}?token=${token}`
        var p = QI.requireSubResource(srcId, token)
        promises.push(p)
      } else {
        // console.warn('没有找到对应的组件ID')
      }
    });

    if (promises.length) {
      Promise.all(promises).then(() => {
        self.hideLoading()
      }).catch(err => {
        self.hideLoading()
        console.error(err)
      })
    } else {
      self.hideLoading()
    }
  }
}

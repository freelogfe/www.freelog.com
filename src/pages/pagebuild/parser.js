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
  importHtml(opt) {
    const htmlFile = new File([opt.content], opt.name, {
      type: opt.type || 'text/html'
    })
    const objectURL = window.URL.createObjectURL(htmlFile);
    const link = document.createElement('link');

    link.rel = 'import';
    link.href = objectURL;
    document.head.appendChild(link);
  },
  parseWidgetPresentable(res) {
    var systemMeta = decodeURIComponent(res.headers.get('freelog-system-meta'))
    try {
      systemMeta = JSON.parse(systemMeta) || {}
    } catch (err) {
      systemMeta = {}
      console.log(err)
    }
    res.text().then((content) => {
      this.importHtml({
        name: systemMeta.widgetName,
        content: content,
        type: systemMeta.mimeType
      })
    })
  },
  triggerPresentableAuth(res) {
    res.json().then(function (data) {
      window.FreeLogApp.handleErrorResponse(data, (presentable) => {
        if (presentable._contractStatus === 3) {
          location.reload()  //后续考虑局部更新？
        }
      })
    })
  },
  createImport(srcId, token) {
    return new Promise((resolve, reject) => {
      var url = `/api/v1/auths/presentable/subResource/${srcId}?token=${token}`
      var link = document.createElement('link')
      link.rel = 'import'
      link.onload = resolve
      link.onerror = reject
      link.href = url
      document.head.appendChild(link)
    })
  },
  createScript(url, type) {
    return new Promise((resolve, reject) => {
      var link = document.createElement('script')
      link.type = type || 'module'
      link.onload = resolve
      link.onerror = reject
      link.src = url
      document.head.appendChild(link)
    })
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
        var url = `/v1/auths/presentable/subResource/${srcId}?token=${token}`
        var p = this.createScript(url)
        this.createScript(url, 'nomodule') //兼容不支持esm的浏览器
        // var p = window.QI.fetch(`/v1/auths/presentable/subResource/${srcId}?token=${token}`).then((res) => {
        //   if (res.ok) {
        //     if (res.headers.get('freelog-resource-type') || res.headers.get('content-type') === 'text/html') {
        //       self.parseWidgetPresentable(res)
        //     } else {
        //       self.triggerPresentableAuth(res)
        //     }
        //   } else {
        //     throw new Error(res)
        //   }
        // }).catch((err) => {
        //   console.error(err)
        // });
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

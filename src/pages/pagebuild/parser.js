export default {
  start() {
    var self = this
    var authInfo = window.__auth_info__;
    var authErrorData = authInfo && authInfo.__auth_error_info__

    if (!authErrorData) {
      self.loadWidgets()
    } else {
      window.FreeLogApp.trigger(window.FreeLogApp.EventCode.invalidResponse, {
        data: authErrorData || {},
        callback(presentable) {
          if (presentable._contractStatus === 3) {
            location.reload()
          }
        }
      })
    }
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
      systemMeta = JSON.parse(systemMeta)
    } catch (err) {
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
      window.FreeLogApp.trigger(window.FreeLogApp.EventCode.invalidResponse, {
        data: data,
        callback(presentable) {
          if (presentable._contractStatus === 3) {
            location.reload()  //后续考虑局部更新？
          }
        }
      })
    })
  },
  loadWidgets() {
    var self = this;
    var $widgets = this.getWidgets()

    Array.from($widgets).forEach(function (widget) {
      var prensentableId = widget.getAttribute('data-widget-presentable-id');
      var srcId = widget.getAttribute('data-widget-src');
      if (prensentableId) {
        window.QI.fetchPresentable(`${prensentableId}.data`, {
          data: {
            resourceId: srcId
          }
        }).then((res) => {
          if (res.ok) {
            if (res.headers.get('freelog-resource-type') || res.headers.get('content-type')==='text/html') {
              self.parseWidgetPresentable(res)
            } else {
              debugger
              self.triggerPresentableAuth(res)
            }
          } else {
            throw new Error(res)
          }
        }).catch((err) => {
          console.error(err)
        })
      } else {
        // console.warn('没有找到对应的组件ID')
      }
    })
  }
}

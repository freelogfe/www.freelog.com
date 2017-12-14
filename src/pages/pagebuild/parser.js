function importHtml(href) {
    return new Promise(function (resolve, reject) {
        const link = document.createElement('link');
        link.onload = resolve;
        link.onerror = reject;
        link.rel = 'import';
        link.href = href;
        document.head.appendChild(link);
    });
}

export default {
    start() {
        var self = this
        var authInfo = window.__auth_info__;
        var authErrorData = authInfo.__auth_error_info__

        if (!authErrorData) {
            self.loadWidgets()
        } else {
            window.FreeLogApp.trigger(window.FreeLogApp.ExceptionCode.invalidResponse, authErrorData.data || {})
        }
    },
    getWidgets() {
        var $page = document.querySelector('#js-page-container')
        var $widgets = $page.querySelectorAll('.js-wc-widget');
        return $widgets
    },
    loadWidgets() {
        var $widgets = this.getWidgets()
        var url = `//api.freelog.com/v1/nodes/${window.__auth_info__.__auth_node_id__}/presentables/`
        Array.from($widgets).forEach(function (widget) {
            var prensentableId = widget.getAttribute('data-widget-presentable-id');
            if (prensentableId) {
                window.QI.fetchPresentable(`${prensentableId}.data`)
                    .then((res) => {
                        return res.json()
                    })
                    .then(function (data) {
                        window.FreeLogApp.trigger(window.FreeLogApp.ExceptionCode.invalidResponse, data)
                    })
                    .catch((err) => {
                        //json解析不成功默认是成功情况,待优化判断逻辑
                        importHtml(`${url}${prensentableId}.data`)
                    })
            } else {
                //还没授权
            }
        })
    }
}
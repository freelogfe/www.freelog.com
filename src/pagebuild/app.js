;(function (win) {
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

    var isPageLoaded = false;
    var handles = []

    function pageLoaded() {
        isPageLoaded = true;
        var h;
        while ((h = handles.shift())) {
            h()
        }
    }

    function DOMReady(fn) {
        if (isPageLoaded) {
            fn()
        } else {
            handles.push(fn);
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);

        }
    }

    DOMReady(function () {
        window.QI = document.querySelector('.js-lib-qi');
        var $page = document.querySelector('#js-page-container')
        var $widgets = $page.querySelectorAll('.js-wc-widget');

        var url = `//api.freelog.com/v1/nodes/${window.__page_build_config.nodeId}/presentables/`
        Array.from($widgets).forEach(function (widget) {
            var prensentableId = widget.getAttribute('data-widget-presentable-id');

            if (prensentableId) {
                var src = url + `${prensentableId}.data`;
                importHtml(src)
                    .then(function (widget) {
                        // console.log(widget)
                    })
                    .catch(function (error) {
                        console.error(error)
                    })
            } else {

            }
        })
    });
})(window);
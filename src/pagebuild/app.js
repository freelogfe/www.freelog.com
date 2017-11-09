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
//10013
    win.onload = function () {
        var $QI = document.querySelector('.js-lib-qi');
        window.QI = $QI.QI;
        var $page = document.querySelector('#js-page-container')
        var $widgets = $page.querySelectorAll('.js-wc-widget');
        var nodeId = 10013;

        var url = `//api.freelog.com/v1/nodes/${nodeId}/presentables/`
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
    }
})(window);
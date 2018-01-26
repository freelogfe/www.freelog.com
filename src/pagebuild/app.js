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


  var selected;//已选的策略
  var allData;//数据


  DOMReady(function () {
    window.QI = document.querySelector('.js-lib-qi');
    var $page = document.querySelector('#js-page-container')
    var $widgets = $page.querySelectorAll('.js-wc-widget');

    //如果有报错信息
    var windowAuth = window.__auth_info__;
    //未激活状态
    if (windowAuth.__auth_error_info__.errcode == 70080104) {
      window.QI.fetch('/v1/contracts/test', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contractId: '5a0ea031d8eb01001f683b1e',
          eventId: '6a8f182d07b6486eb4098f69c784c665'
        })
      })
    } else {
      //未签约状态
      var presentableId = windowAuth.__auth_error_info__.data.data.presentableId;
      var url = '/v1/presentables/' + presentableId;
      window.QI.fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        allData = data.data;
        showPolicy(data.data, presentableId);
      })
    }


    function showPolicy(data, presentableId) {
      var HTMLStr = renderPolicy(data, presentableId)
      layer.open({
        type: 1,
        title: ['签约', 'font-size:18px;'],
        area: ['1200px', '560px'],
        shadeClose: true, //点击遮罩关闭
        content: HTMLStr
      });
    }

    function renderPolicy(data, presentableId) {
      var str = '';
      data = [data]
      data.forEach(function (policies, outerid) {
        str += '<div class="policy">'
        str += '<h3>' + policies.name + '</h3>'
        str += '<p>' + renderSegment(policies.policy, outerid) + '</p>'
        str += '</div><br/>'
      })
      str += '<button id="submit">签约</button>'
      $(document).on('click', '#submit', function () {
        console.log(allData);
        window.QI.fetch('/v1/contracts', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contractType: 3,
            targetId: presentableId,
            segmentId: allData.policy[selected].segmentId,
            serialNumber: allData.serialNumber,
            partyTwo: window.__auth_info__.__auth_user_id__

          })
        })
      })
      return str;
    }

    function renderSegment(segments, outerid) {
      var str = ''
      segments.forEach(function (block) {
        str += '<div class="segment">'
        str += renderState(block.fsmDescription)
        str += '<button class="selectSegment" id="clickId' + outerid + '">选中</button>'
        $(document).on('click', '#clickId' + outerid, function () {
          console.log('selected');
          console.log(outerid,);
          selected = outerid;
        })
        str += '</div>'
      })
      return str;
    }

    function renderState(fsm) {
      var str = ''
      fsm.forEach(function (state) {
        str += state.currentState + state.nextState + '<br>'
      })
      return str
    }

    var url = `/v1/presentables/resource/`
    Array.from($widgets).forEach(function (widget) {
      var prensentableId = widget.getAttribute('data-widget-presentable-id');

      if (prensentableId) {
        var src = `${url}${prensentableId}.data?nodeId=${window.__auth_info__.__auth_node_id__}`;
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

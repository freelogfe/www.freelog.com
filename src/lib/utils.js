const host = location.host.split('.').slice(1).join('.')

function getPageKey() {
  return `${location.href}_scrollTop`
}

function cacheScrollTop() {
  var key = getPageKey()
  var rect = document.body.getBoundingClientRect()
  localStorage.setItem(key, -rect.top)
}


function _scrollTop(st,callBuf) {
  var rect = document.body.getBoundingClientRect()
  window.scrollTo(0, st)
  callBuf--;
  if (-rect.top < st && callBuf > 0) {
    setTimeout(function () {
      _scrollTop(st, callBuf)
    }, 20)
  } else {
    var key = getPageKey()
    localStorage.removeItem(key)
  }
}

function gotoCacheScrollTop() {
  var key = getPageKey()
  var st = parseInt(localStorage.getItem(key))
  if (!isNaN(st)) {
    _scrollTop(st, 3333)
  }
}

function gotoLogin(redirect) {
  cacheScrollTop()
  var host = location.host.replace(/\w+\./, 'www.')
  var loginUrl = `//${host}/pages/user/login.html`
  if (redirect) {
    loginUrl += '?redirect=' + encodeURIComponent(redirect)
  }

  location.href = loginUrl
}


function resolveNodeDomain(domain) {
  return `${domain}.${host}`
}


export {
  gotoLogin,
  gotoCacheScrollTop,
  resolveNodeDomain
}

export default {
  gotoLogin,
  gotoCacheScrollTop
}


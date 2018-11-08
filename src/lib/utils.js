const host = window.location.host.split('.').slice(1).join('.')

function getPageKey() {
  return `${window.location.href}_scrollTop`
}

function cacheScrollTop() {
  const key = getPageKey()
  const rect = document.body.getBoundingClientRect()
  localStorage.setItem(key, -rect.top)
}


function scrollTopHandler(st, callBuf) {
  const rect = document.body.getBoundingClientRect()
  window.scrollTo(0, st)
  callBuf -= 1
  if (-rect.top < st && callBuf > 0) {
    setTimeout(() => {
      scrollTopHandler(st, callBuf)
    }, 20)
  } else {
    const key = getPageKey()
    localStorage.removeItem(key)
  }
}

function gotoCacheScrollTop() {
  const key = getPageKey()
  const st = parseInt(localStorage.getItem(key), 10)
  if (!Number.isNaN(st)) {
    scrollTopHandler(st, 3333)
  }
}

function isSafeUrl(url) {
  const reg = /^.+\.(test)?freelog\.com$/

  try {
    const obj = new URL(url) // 正确的链接检测
    if (reg.test(obj.hostname)) {
      return true
    }
  } catch (e) {
    // path型链接检测
    if ((/^\/[^\/]+/.test(url))) {
      return true
    }
  }

  return false
}

function gotoLogin(redirect) {
  cacheScrollTop()

  let loginPath = '/login'
  if (location.pathname === loginPath) {
    return
  }

  let loginUrl = `//www.${window.FreelogApp.Env.mainDomain}${loginPath}`
  if (isSafeUrl(redirect)) {
    loginUrl += `?redirect=${encodeURIComponent(redirect)}`
  }

  window.location.href = loginUrl
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


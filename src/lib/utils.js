function gotoLogin(url) {
  var host = location.host.replace(/\w+\./, 'www.')
  var loginUrl = `//${host}/pages/user/login.html?redirect=`
  if (url) {
    loginUrl += encodeURIComponent(url)
  }

  location.href = loginUrl
}


// export var gotoLogin = gotoLogin

export {
  gotoLogin
}

export default {
  gotoLogin
}


import Vue from 'vue'

function initEnv() {
  const win = window
  const isTest = /\.testfreelog\.com$/.test(win.location.host)
  const mainDomain = isTest ? 'testfreelog.com' : 'freelog.com'
  win.FreelogApp = win.FreelogApp || {}
  win.FreelogApp.Env = win.FreelogApp.Env || {}

  if (win.__auth_info__) {
    Object.assign(win.FreelogApp.Env, {
      nodeId: win.__auth_info__.__auth_node_id__,
      userId: win.__auth_info__.__auth_user_id__
    })
  }
  Object.assign(win.FreelogApp.Env, {
    isTest,
    mainDomain
  })

  win.FreelogApp.Env.qiOrigin = win.location.protocol + '//qi.' + mainDomain
}

initEnv()

export default Vue
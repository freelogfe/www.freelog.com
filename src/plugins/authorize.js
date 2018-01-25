import store from '../store'

export default Vue => {
  store.dispatch('checkToken')
    .then(valid => {
      if (valid) return next()
      location.href = '/pages/user/login.html?redirect=' + encodeURIComponent(location.href)
    })
}

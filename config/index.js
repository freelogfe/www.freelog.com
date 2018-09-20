module.exports = {
  build: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/public/',
    assetsDomain: '//static.freelog.com',
    assetsTestDomain: '//static.testfreelog.com'
  },
  dev: {
    port: {
      http: 9080, //80
      https: 9443  //443
    },
    hmr: true,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
    }
  }
}

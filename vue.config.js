/* eslint-disable */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const fs = require('fs')
const srcDir = path.resolve('./src');
const config = require('./config')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2));
const isProd = argv.env === 'prod' || process.env.NODE_ENV === 'production'
// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']


function getBaseUrl() {
  var baseUrl
  if (argv.env === 'beta') {
    baseUrl = config.build.assetsTestDomain
  } else if (isProd) {
    baseUrl = config.build.assetsDomain
  } else {
    baseUrl = '/'
  }
  return baseUrl
}


function getDevServer() {
  var config = {
    port: 9080,
    inline: false,
    /**
     * 关闭host check，方便使用ngrok之类的内网转发工具
     */
    disableHostCheck: true,
    historyApiFallback: true,
    hot: false,
    host: '0.0.0.0'
  }

  if (argv.https) {
    Object.assign(config, {
      https: {
        key: fs.readFileSync('./config/cert/server_ca.key'),
        cert: fs.readFileSync('./config/cert/server_ca.crt'),
      }
    })
  }

  return config
}


module.exports = {
  baseUrl: getBaseUrl(),
  assetsDir: 'public',
  crossorigin: 'anonymous',
  devServer: getDevServer(),
  css: {
    extract: true
  },
  filenameHashing: isProd,
  pages: {
    index: {
      entry: 'src/views/user/app.js',
      template: 'src/views/layout/index.pug',
      filename: isProd ? 'pages/index.html' : 'index.html',
      title: 'freelog个人中心',
    },
    pagebuild: {
      entry: 'src/views/pagebuild/app.js',
      template: 'src/views/layout/pagebuild.pug',
      title: 'freelog',
      filename: isProd ? 'pages/pagebuild.html' : 'pagebuild/index.html'
    }
  },
  configureWebpack: {
    output: {
      // filename: `js/[name].${hashStr}js`,
      // chunkFilename: `[name].${hashStr}js`,
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': srcDir,
        static: path.join(srcDir, 'static'),
        components: path.join(srcDir, 'components'),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        },
      }
    },
    plugins: [
      // new BundleAnalyzerPlugin()
    ]
  },
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      // myConfig.externals = externals

      myConfig.plugins = []
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      // productionGzip && myConfig.plugins.push(
      //   new CompressionWebpackPlugin({
      //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //     threshold: 8192,
      //     minRatio: 0.8
      //   })
      // )
    }
    if (process.env.NODE_ENV === 'development') {
    }

    return myConfig
  },
  chainWebpack: config => {

  }
};

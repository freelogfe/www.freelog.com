/* eslint-disable */

const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const isProd = process.env.NODE_ENV === 'production'
const srcDir = path.resolve('./src');
const config = require('./config')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2));

function getBaseUrl() {
  var baseUrl
  if (argv.beta) {
    baseUrl = config.build.assetsTestDomain
  } else if (isProd) {
    baseUrl = config.build.assetsDomain
  } else {
    baseUrl = '/'
  }
  return baseUrl
}

module.exports = {
  baseUrl: getBaseUrl(),
  assetsDir: 'public',
  crossorigin: 'anonymous',
  devServer: {
    port: 9080,
    inline: false,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: false,
    // https: {
    //   key: fs.readFileSync('./config/cert/server_ca.key'),
    //   cert: fs.readFileSync('./config/cert/server_ca.crt'),
    // }
  },
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
    plugins: []
  },
  // configureWebpack: (config) => {
  //   merge(config, baseWebpackConfig);
  //   if (process.env.NODE_ENV === 'production') {
  //     // mutate config for production...
  //   } else {
  //     // mutate for development...
  //   }
  // },
  chainWebpack: config => {

  }
};

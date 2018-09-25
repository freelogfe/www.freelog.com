/* eslint-disable */

const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const isProd = process.env.NODE_ENV === 'production'
const srcDir = path.resolve('./src')
const hashStr = isProd ? '[hash].' : ''

const baseWebpackConfig = {
  resolve: {

    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': srcDir,
      static: path.join(srcDir, 'static'),
      components: path.join(srcDir, 'components'),
    },
  },
  plugins: [],
};

var isPb = process.argv[3] === '--pb'

module.exports = isPb ? {
  baseUrl: isProd ? '//static.freelog.com/public/pagebuild' : 'public/pagebuild',
  outputDir: 'dist/pagebuild',
  css: {
    extract: true,
  },
  devServer: {
    port: 9080,
    disableHostCheck: true
  },
  filenameHashing: isProd,
  pages: {
    pagebuild: {
      entry: 'src/views/pagebuild/app.js',
      title: '个人中心',
    }
  },
  configureWebpack: {
    output: {
      filename:  `js/pagebuild.${hashStr}js`,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name:'chunk-vendors'
      }
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
    }
  }
} : {
  baseUrl: '/',
  assetsDir: 'public',
  crossorigin: 'anonymous',
  devServer: {
    port: 9080,
    disableHostCheck: true,
    // https: {
    //   key: fs.readFileSync('./config/cert/server_ca.key'),
    //   cert: fs.readFileSync('./config/cert/server_ca.crt'),
    // }
  },
  pages: {
    index: {
      entry: 'src/views/user/app.js',
      template: 'src/views/layout/index.html',
      filename: isProd? 'pages/index.html': 'index.html',
      title: '个人中心',
    }
  },
  configureWebpack: (config) => {
    merge(config, baseWebpackConfig);
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
      // config.output.publicPath = '//static.testfreelog.com/public'
    } else {
      // mutate for development...
    }
  },
  chainWebpack: config => {

  }
};

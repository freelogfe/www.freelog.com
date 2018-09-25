/* eslint-disable */

const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const isProd = process.env.NODE_ENV === 'production'
const srcDir = path.resolve('./src');
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2));
const hashStr = isProd ? '[hash].' : ''

const baseWebpackConfig = {
  output: {
    filename: (chunkData) => {
      console.log(chunkData.chunk)
      return chunkData.chunk.name === 'main' ? '[name].js': '[name]/[name].js';
    },
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
  optimization : {
    splitChunks: {
      chunks: 'async'
    },
  },
  plugins: [],
};

function getBaseUrl(){
  var baseUrl
  if (argv.beta) {
    baseUrl = '//static.testfreelog.com'
  } else if (isProd) {
    baseUrl = '//static.freelog.com'
  } else {
    baseUrl = '/'
  }


  return baseUrl
}

module.exports = argv['pb'] ? {
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
  baseUrl: getBaseUrl(),
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
  css: {
    extract: true
  },
  pages: {
    index: {
      entry: 'src/views/user/app.js',
      template: 'src/views/layout/index.html',
      filename: isProd? 'pages/index.html': 'index.html',
      title: '个人中心',
    },
    pagebuild: {
      entry: 'src/views/pagebuild/app.js',
      template: 'src/views/layout/pagebuild.html',
      filename: isProd? 'pages/pagebuild.html': 'pagebuild/index.html'
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

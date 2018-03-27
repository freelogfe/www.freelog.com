const path = require('path')
const utils = require('./utils')
const config = require('../config')
const glob = require('glob')
const webpack = require('webpack')
const DIRNAME = __dirname;
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const CWD = process.cwd();
const SrcDir = path.join(CWD, 'src')

const extractCSS = new ExtractTextPlugin({
  // filename: '[name].[chunkhash].css',
  filename: '[name].css',
  allChunks: true
})
const extractLESS = new ExtractTextPlugin({
  // filename: '[name].[chunkhash].css',
  filename: '[name].css',
  allChunks: true
})

function getChunkName(filepath) {
  return path.dirname(path.relative(SrcDir, filepath))
}

function getHtmlName(filepath) {
  return path.dirname(path.relative(SrcDir, filepath)) + '.html'
}

var entries = {}
var chunks = []
glob.sync('./src/pages/**/app.js').forEach(filepath => {
  const chunk = getChunkName(filepath)
  entries[chunk] = filepath
  chunks.push(chunk)
})


var webpackConfig = {
  entry: entries,
  node: {
    module: "empty",
    fs: "empty"
  },
  output: {
    path: path.join(CWD, 'dist', 'public'),
    filename: '[name].js',
    // filename: '[name].[chunkhash].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': SrcDir,
      static: path.join(SrcDir, 'static'),
      components: path.join(SrcDir, 'components'),
      root: path.join(CWD, 'node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'style-loader'
            })),
            less: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader', 'less-loader'],
              fallback: 'style-loader'
            })),
            postcss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader'],
              fallback: 'style-loader'
            }))
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [SrcDir],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.less$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'less-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: path.resolve(DIRNAME, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'static/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new CopyWebpackPlugin([
      {from: './src/pagebuild/', to: '../pagebuild'}
    ]),
    extractLESS,
    extractCSS,
    new WebpackShellPlugin({
      onBuildEnd: ['node ./build/buildend.js']
    })]
};

glob.sync('./src/pages/**/*.pug').forEach(filepath => {
  const chunk = getChunkName(filepath)
  const filename = getHtmlName(filepath)
  const htmlConf = {
    filename: filename,
    template: filepath,
    inject: 'body',
    favicon: './src/static/img/logo.png',
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk]
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = webpackConfig


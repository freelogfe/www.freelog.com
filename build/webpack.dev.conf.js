var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


var plugins = [
  new webpack.DefinePlugin({
    'process.env': config.dev.env
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin()]

if (config.dev.hmr) {
// add hot-reload related code to entry chunks
  Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
  })
  plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = merge(baseWebpackConfig, {
  module: {},
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: []
})

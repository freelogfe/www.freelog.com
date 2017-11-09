'use strict'
const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const DIRNAME = __dirname;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CWD = process.cwd();
const SrcDir = path.join(CWD, 'src')

const extractCSS = new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    allChunks: true
})
const extractLESS = new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    allChunks: true
})

function getChunkName(filepath) {
    return path.dirname(path.relative(SrcDir, filepath))
}


function getHtmlName(filepath) {
    return path.dirname(path.relative(SrcDir, filepath)) + '.html'
}

const entries = {}
const chunks = []
glob.sync('./src/pages/**/app.js').forEach(filepath => {
    const chunk = getChunkName(filepath)
    entries[chunk] = filepath
    chunks.push(chunk)
})

const config = {
    entry: entries,
    output: {
        path: path.resolve(DIRNAME, './dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@':  path.join(DIRNAME, 'src'),
            assets: path.join(DIRNAME, 'src/assets'),
            components: path.join(DIRNAME, 'src/components'),
            root: path.join(DIRNAME, 'node_modules')
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
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'assets/img/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CommonsChunkPlugin({
            name: 'vendors',
            filename: 'assets/js/vendors.js',
            chunks: chunks,
            minChunks: chunks.length
        }),
        extractLESS,
        extractCSS
    ],
    devServer: {
        host: 'localhost',
        port: 8010,
        historyApiFallback: false,
        noInfo: true,
        proxy: {
            // '/api': {
            //     target: 'http://127.0.0.1:8080',
            //     changeOrigin: true,
            //     pathRewrite: {'^/api': ''}
            // }
        },
        open: true,
        openPage: 'pages/user/login.html'
    },
    devtool: '#eval-source-map'
}

glob.sync('./src/pages/**/*.pug').forEach(filepath => {
    const chunk = getChunkName(filepath)
    const filename = getHtmlName(filepath)
    const htmlConf = {
        filename: filename,
        template: filepath,
        inject: 'body',
        favicon: './src/assets/img/logo.png',
        hash: process.env.NODE_ENV === 'production',
        chunks: ['vendors', chunk]
    }
    config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new OptimizeCSSPlugin()
    ])
}

module.exports = config

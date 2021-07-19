const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    // https://webpack.docschina.org/configuration/resolve/#resolvealias
    alias: {
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            // https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-template-compiler/README.md#选项
            preserveWhitespace: false,
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // https://webpack.docschina.org/configuration/module/#ruleexclude
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        // url-loader的作用是当文件小于指定大小时返回一个base64格式的Data URL
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        // https://webpack.docschina.org/configuration/module/#ruleuse
        // 多个loader会从右到左被应用（从最后到最先配置）
        use: isProduction
          // https://www.webpackjs.com/plugins/extract-text-webpack-plugin/
          // extract-text-webpack-plugin插件用于将bundle中引用的css，移动到独立分离的css文件中
          ? ExtractTextPlugin.extract({
            use: [
              // css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样
              { loader: 'css-loader' },
            ],
            fallback: 'vue-style-loader'
          })
          :
          // vue-style-loader是从style-loader库fork出来的，均支持将CSS样式表以style标签的形式注入到HTML文档中
          // 不同的是vue-style-loader额外支持SSR相关特性（https://github.com/vuejs/vue-style-loader#differences-from-style-loader）
          ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: isProduction
    ? [
        new VueLoaderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: { warnings: false }
        // }),
        // https://v4.webpack.docschina.org/plugins/module-concatenation-plugin/
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]  
}
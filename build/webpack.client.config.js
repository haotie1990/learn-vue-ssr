const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../enter-client.js'),
  plugins: [
    // https://www.webpackjs.com/plugins/commons-chunk-plugin/
    // 提取公共模快，建立独立文件
    // 但要注意，如果是从NPM依赖中导入的CSS，则不应该外化处理，否则会与Extract-text-webpack-plugin产生冲突
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   // 一个模快被提取到vendor chunk时回调
    //   minChunks: function(module){
    //     return (
    //       // 如果这个模快位于node_modules之中
    //       /node_modules/.test(module.context) &&
    //       // 并且request的是一个css文件，则无需将其独立
    //       !/\.css$/.test(module.request)
    //     )
    //   },
    // }),
    // 默认生成vue-ssr-client-manifest.json
    new VueSSRClientPlugin()
  ]
});

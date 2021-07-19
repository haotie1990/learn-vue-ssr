const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, '../entry-server.js'),

  output : {
    filename: 'server-bundle.js',
    // https://webpack.docschina.org/configuration/output/#librarytarget-commonjs2
    // 将生成的server-bundle使用module.exports导出
    libraryTarget: 'commonjs2'
  },

  // https://webpack.docschina.org/configuration/target/#target
  // 编译打包为Node环境可用，使用require引入chunk
  // 并且在编译Vue组件时，会告知“vue-loader”输出面向服务端的代码（server-oriented code）
  target: 'node',
  devtool: 'source-map',

  // https://webpack.docschina.org/configuration/externals/
  // externals的作用就是：
  // * 防止将某些 import/require 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({ // in order to ignore all modules in node_modules folder
    allowlist: /\.css$/,
  }),

  plugins: [
    // 默认会构建vue-ssr-server-bundle.json的文件
    // ? 这个文件的作用是什么 - https://ssr.vuejs.org/zh/api/#createbundlerenderer
    new VueSSRServerPlugin()
  ]
});

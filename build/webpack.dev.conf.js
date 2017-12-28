'use strict'
const utils = require('./utils') // 引入工具函数包
const webpack = require('webpack') // 引入webpack
const config = require('../config') // 引入config文件夹下的index.js
const merge = require('webpack-merge') // 合并对象或数组的一个东东
const baseWebpackConfig = require('./webpack.base.conf') // 引入webpack的基本配置
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入html插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 识别某些类型的webpack错误并清理，汇总和优先化它们以提供更好的开发者体验。
const portfinder = require('portfinder') // 一个简单的工具来查找当前机器上的开放端口

const HOST = process.env.HOST // 拿到Host  undefined
const PORT = process.env.PORT && Number(process.env.PORT) // 拿到端口号 undefined

// 将webpack及基本配置文件与下面的其他配置合并。
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 这里对处理css文件的loader进行了单独的配置
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // “cheap-module-eval-source-map”的开发速度更快
  devtool: config.dev.devtool,

  // 这些devServer选项应该在../config/index.js中配置
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true, // 是否开发 HTML5 History API 网页
    hot: true, // 是否开启模块热替换功能
    compress: true, // 是否开启 gzip 压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser, // 自动打开浏览器
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true } // 当出现编译器错误或警告时，在浏览器中显示全屏叠加. 这里配置显示错误，不显示警告
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable, // 代理到后端服务接口
    quiet: true,  // quiet为true后，除初始启动信息外，没有任何东西会写入控制台。 这也意味着来自webpack的错误或警告是不可见的。// 需要 FriendlyErrorsPlugin 插件
    watchOptions: { // 一组用于自定义监听模式的选项：
      poll: config.dev.poll, // false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.HMR在更新控制台上显示正确的文件名称。
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

// 上面的都配置好后，接着就是去找一个可用的端口，找到了就resolve()
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 发布e2e测试所需的新端口
      process.env.PORT = port
      // 将端口添加到devServer配置
      devWebpackConfig.devServer.port = port

      // 添加FriendlyErrorsPlugin插件
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`你的应用运行在这里: http://${devWebpackConfig.devServer.host}:${port}`],
          // messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))
      // 成功则返回解析后的devWebpackConfig这个对象
      resolve(devWebpackConfig)
    }
  })
})

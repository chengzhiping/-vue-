'use strict'
require('./check-versions')() // 检查版本

process.env.NODE_ENV = 'production'

const ora = require('ora') // 一个在终端优雅的显示信息的东东
const rm = require('rimraf') // 一个用来删除文件的东东
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
console.log(chalk.yellow('构建环境：', process.env.NODE_ENV));

const spinner = ora('building for production... 正在构建生产包')
spinner.start() // 开始织布提示
// /Users/administrator/Desktop/webpack学习/vue/my-project/dist/static
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => { // 先删除dist/static下的文件 若删除失败抛出错误，成功，则开始webpack
  if (err) throw err
  webpack(webpackConfig, (err, stats) => { // (err, stats)=>{}编译成功后的回调
    spinner.stop() // 停止织布提示
    if (err) throw err // err对象不包含编译错误的相关信息，编译的错误信息需要单独通过
    process.stdout.write(stats.toString({ // 这里的功能就是现实输出后的一些构建信息
      colors: true, // 输出文字彩色
      modules: false,
      children: false, // 如果你正在使用ts-loader，将其设置为true将会在构建过程中显示typescript错误
      chunks: false, // 将此项配置为true后，终端上会将sourcemap文件打印出来
      chunkModules: false // 这个配置为true后 发现没啥变化
    }) + '\n\n')

    if (stats.hasErrors()) { // stats.hasErrors()来获取.err对象只包含webpack相关的错误问题，比如缺少某项配置。
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1) // process.exit方法用来退出当前进程。它可以接受一个数值参数，如果参数大于0，表示执行失败；如果等于0表示执行成功。// http://javascript.ruanyifeng.com/nodejs/process.html
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.red(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

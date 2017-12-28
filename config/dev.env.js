'use strict'
const merge = require('webpack-merge') // 合并对象或数组的一个东东
const prodEnv = require('./prod.env') // 引入生产环境配置

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})

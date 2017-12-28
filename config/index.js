'use strict'
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.
// 这是公开配置文件的一些最常用配置选项的主要配置文件

const path = require('path')

module.exports = {
  dev: {

    // 路径
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {}, // 这个主要是用来配置发送后端api接口时重定向地址用 参考http://vuejs-templates.github.io/webpack/proxy.html

    // Various Dev Server settings 各种开发服务器设置
    host: 'localhost', // 可以被process.env.HOST重写覆盖
    port: 8080, // 可以被process.env.PORT覆盖，如果端口正在使用，将会重新生成一个新的
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // 使用Eslint加载器？
    // 如果为true，那么在绑定和linting错误期间你的代码将被删除，并且控制台中将显示警告。
    useEslint: true,
    // 如果为true，Eslint错误和警告也会显示在浏览器的错误覆盖中。
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // 如果你在调试devtools中的vue-files时遇到问题，把它设置为false  - 它可能会帮助你
    // 是否通过给文件名后加哈希查询值来避免生成的 source map 被缓存。关掉这一选项有益于 source map 调试。
    // 默认值：在开发环境下是 true，在生产环境下是 false。
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps默认是关闭的，因为相对路径是“buggy”
    // 根据CSS-Loader README，使用此选项
    //（https://github.com/webpack/css-loader#sourcemaps）
    // 根据我们的经验，他们一般按预期工作，
    // 启用此选项时请注意此问题。
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true, // 生产环境是否生产出sourceMap文件
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // 默认Gzip为许多流行的静态主机，比如
    // Surge或Netlify已经为您提供了所有的静态资源。
    // 在设置为“true”之前，请确保：
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // 用一个额外的参数运行build命令
    // 构建完成后查看包分析器报告：
    // `npm run build --report`
    // 设置为“true”或“false”来始终打开或关闭它
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}



// cssLoaders({ sourceMap: false, usePostCSS: true })
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap // false
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap // false
    }
  }
  // 生成与提取文本插件一起使用的加载器字符串
  function generateLoaders (loader, loaderOptions) {
    // 如果配置了使用postcss loader 则预处理cssloader前使用postcssLoader,如果为false,则只是用一个cssLoader
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 指定该选项时提取CSS
    //（生产过程中就是这样）
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(), // ['vue-style-loader', {loader: 'css-loader', options: {sourceMap: false}}, {loader: 'postcss-loader', options: {sourceMap: false}}]
    postcss: generateLoaders(), // ['vue-style-loader', {loader: 'css-loader', options: {sourceMap: false}}, {loader: 'postcss-loader', options: {sourceMap: false}}]
    less: generateLoaders('less'),// ['vue-style-loader', {loader: 'css-loader', options: {sourceMap: false}}, {loader: 'postcss-loader', options: {sourceMap: false}}, {loader: 'less-loader', options: {sourceMap: false}}]
    sass: generateLoaders('sass', { indentedSyntax: true }), // ['vue-style-loader', {loader: 'css-loader', options: {sourceMap: false}}, {loader: 'postcss-loader', options: {sourceMap: false}}, {loader: 'less-loader', options: {sourceMap: false, indentedSyntax: true }}]
    scss: generateLoaders('sass'), // ['vue-style-loader', {loader: 'css-loader', options: {sourceMap: false}}, {loader: 'postcss-loader', options: {sourceMap: false}}, {loader: 'sass-loader', options: {sourceMap: false}}]
    stylus: generateLoaders('stylus'), // ['vue-style-loader', {loader: 'css-loader', options: {sourceMap: false}}, {loader: 'postcss-loader', options: {sourceMap: false}}, {loader: 'stylus-loader', options: {sourceMap: false}}]
    styl: generateLoaders('stylus') // ['vue-style-loader', {loader: 'css-loader', options: {sourceMap: false}}, {loader: 'postcss-loader', options: {sourceMap: false}}, {loader: 'stylus-loader', options: {sourceMap: false}}]
  }
}
// styleLoaders({ sourceMap: false, usePostCSS: true })
// 为独立样式文件生成装载器（.vue之外）
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension] // css部分的loader
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}


exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

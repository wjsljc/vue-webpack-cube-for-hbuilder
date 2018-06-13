'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const PostCompilePlugin = require('webpack-post-compile-plugin')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const glob = require('glob')
const entries = getEntry(['./src/html/*.js', './src/html/**/*.js', './src/html/**/**/*.js']) // 获得入口js文件

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

console.log('entries ' + JSON.stringify(entries))
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? undefined
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'html': resolve('src/html'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'static': resolve('static')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/iconfont.[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new PostCompilePlugin(),
    new TransformModulesPlugin()
  ]
}

function getEntry (globPath) {
  console.log('globPath ' + JSON.stringify(globPath))
  let entries = {},
    basename, tmp, pathname;
  if (typeof (globPath) != "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      if (entry.split('/').length > 4) {
        if (entry.split('/').length === 5) {
          tmp = entry.split('/').splice(-3)
          pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        } else if (entry.split('/').length === 6) {
          tmp = entry.split('/').splice(-4)
          pathname = tmp[0] + '/' + tmp[1] + '/' + basename; // 正确输出js和html的路径
        }
        entries[pathname] = entry;
      } else {
        entries[basename] = entry;
      }
    });
  });
  // console.log('entries ' + JSON.stringify(entries))
  return entries;
}

/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

module.exports = {

  output: {
    filename: 'main.js',
    //部署到服务器上后，文件所在路径
    publicPath: '/assets/'
  },

  cache: true,//增量编译
  debug: true,//loaders的debug模式
  devtool: 'sourcemap',//生成sourcemap
  entry: [
      'webpack/hot/only-dev-server',//热加载需要插件
      './src/components/GalleryByReactApp.js'
  ],

  stats: {//控制台打印配置
    colors: true,
    reasons: true
  },
  resolve: {
    //省略后缀
    extensions: ['', '.js', '.jsx'],
    //require('c:/a/b/c/d/styles/main.css') ==> require('styles/main.css')
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader'
    }, {
      test: /\.scss/,
      //?后方为配置项
      loader: 'style-loader!css-loader!auto-prefixer-loader?{browsers:["last 2 version"]}!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!auto-prefixer-loader?{browsers:["last 2 version"]}'
    }, {
      test:/\.json$/,
      loader:'json-loader'
    },
    {
      test: /\.(png|jpg|woff|woff2)$/,
      //返回文件地址，若文件小于limit大小，则返回文件base64
      loader: 'url-loader?limit=8192'
    }]
  },

  //webpack插件系统
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};

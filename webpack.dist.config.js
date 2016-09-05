/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');

module.exports = {

  output: {
    publicPath: '/assets/',
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: './src/components/GalleryByReactApp.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),//检测相似文件，消除冗余
    new webpack.optimize.UglifyJsPlugin(),//压缩js
    new webpack.optimize.OccurenceOrderPlugin(),//按照引用频率，排序各个模块bundle的id，频率越高，id越短
    new webpack.optimize.AggressiveMergingPlugin(),//优化生成的代码段，合并相似
    new webpack.NoErrorsPlugin()//保证编译过程不出错
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
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
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!auto-prefixer-loader?{browsers:["last 2 version"]}'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!auto-prefixer-loader?{browsers:["last 2 version"]}!sass-loader?outputStyle=expanded'
    }, {
      test:/\.json$/,
      loader:'json-loader'
    },{
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};

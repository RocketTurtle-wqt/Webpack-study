const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/entry/index.js',
  
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  /*
  js兼容性处理 babel-loader @babel/core
    1.@babel/preset-env
      ---只能转换部分js基本语法，如promise等高级语法无法转换
    2.@babel/polyfill
      ---能做全部js语法的兼容性处理，缺点是体积比较大
    3.按需做兼容性处理 core-js
  */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //预设：指示babel应该做怎样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                //按需加载
                useBuiltIns: 'usage',
                //指定core-js版本
                corejs: {
                  version: '3'
                },
                //指定兼容哪些浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  edge: '17',
                  safari: '10'
                }
              }
            ]
          ]
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  mode: 'development'
}
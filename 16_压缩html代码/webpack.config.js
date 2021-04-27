const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/entry/index.js',
  
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      //压缩html代码
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],

  mode: 'production'
}
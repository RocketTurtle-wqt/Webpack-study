const path = require('path');
const HtmlWebpackPLugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/entry/index.js',
  
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  /*
  eslint：不仅会检查src目录下的js文件，还会检查node_modules里的库
      eslint eslint-loader
    注意：需要配置eslint语法检查的规则
      插件--- eslint-config-airbnb-base eslint-plugin-import eslint
      在package.json中配置eslintConfig
  */
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        //语法规范自动修复
        options: {
          fix: true
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPLugin({
      template: './src/index.html'
    })
  ],

  mode: 'development'
}
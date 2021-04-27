const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        //匹配以.jpg/.png/.gif结尾的图片
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          //小于等于8K的图片以base64编码
          //优点：减少请数量
          //缺点：体积变大
          limit: 8 * 1024,
          //url-loader默认以ES6模块去解析，会和html-loader的commonjs模块冲突，所以需要关闭
          esModule: false,
          //只保留10位hash值
          name:'[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader:'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],

  mode:'development'
}
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',

  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          //使用postcss做css的兼容性处理
          //process-preset-env帮助post-css到package.json文件里找browserslist中的开发环境和生产环境的兼容性配置
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {                
                ident: 'postcss',
                plugins: () => [
                  require('postcss-preset-env')()
                ]
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  
  mode: 'development'
}
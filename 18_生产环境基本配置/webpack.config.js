const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');

const commonCssLoader = [
  //提取css成单独文件
  MiniCssExtractPlugin.loader,
  'css-loader',
  //css兼容性处理
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

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader']
      },
      /**
       * 先执行eslint再执行babel，使用enforce
       */
      //配置js语法检测，package.json中的eslintConfig=>airbnb
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      //做js的兼容性处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9'
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[.ext]',
          outputPath: 'images',
          esModule: false
        }
      },
      {
        test: /\.html$/,
        loader:'html-loader',
      },
      {
        exclude: /\.(css|less|js|jpg|png|gif|html)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/build.css'
    }),
    //压缩css代码
    new OptimizeCssWebpackPlugin(),
    new HtmlWebpackPLugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    })
  ],
  mode: 'production'
}
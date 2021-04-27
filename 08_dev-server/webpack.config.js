const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //入口文件
  entry: './src/index.js',
  //输出bundle的位置
  output: {
    filename: 'built.js',
    path: resolve(__dirname,'build')
  },
  //loader
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [          
          //创建一个style标签，将样式插入到这个标签中，再将标签挂载到head中
          'style-loader',
          //将css文件编程commonjs模块，放入js中
          'css-loader'
        ]
      }
    ]
  },
  //插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  //生产环境
  mode: 'development',
  //开发环境
  // mode: 'production'

  //配置devServer
  //有自动编译、自动打开浏览器、自动刷新浏览器的功能
  //在内存中操作，不会输出
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    //启动gzip压缩
    compress: true,
    
    port: 3000,
    //自动打开浏览器
    open:true
  }
}
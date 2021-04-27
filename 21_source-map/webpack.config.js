const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * HMR：hot module replacement，模块热替换
 *  ---局部文件变化不会使整个项目重新打包构建
 *  ---开启方式：给devServer添加hot: true
 * css：支持HMR，style-loader内部实现了HMR
 * js：不支持HMR，更改其余js文件会导致整个项目被重新打包构建
 *  ---解决：在入口文件处添加代码
 * html：不支持HMR
 */

//  if (module.hot) {
//     module.hot.accept('./hello.js', function () {
//       print();
//     });
//   }

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
    open: true,
    hot: true
  },
  /**
   * source-map：一种提供源代码到构建后代码映射的一种技术（若构建后代码出错，可以通过映射追踪到源代码）
   * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
   * 
   * source-map，外部
   *  ---错误代码准确信息和源代码准确位置
   * inline-source-map，内部
   *  只有一个source-map
   *  ---错误代码准确信息和源代码准确位置
   * hidden-source-map，外部
   *  ---错误代码准确信息，但是不能追踪到源代码
   * eval-source-map，内部
   *  每一个文件都会生成一个source-map在eval里
   *  ---错误代码准确信息和源代码准确位置
   * nosources-source-map，外部
   *  ---错误代码准确信息，但是没有源代码任何信息
   * cheap-source-map，外部
   *  ---错误代码准确信息和源代码准确位置（精度是行）
   * cheap-module-source-map
   *  ---错误代码准确信息和源代码准确位置（精度是行）
   *  ---module会将loader的source-map也加进来
   * 内部和外部的区别：
   *  ---1.外部生成了文件
   *  ---2.内部构建更快
   * 开发环境：速度快，调试更友好
   *  ---速度（eval>inline>cheap） eval-cheap-source-map>eval-source-map
   *  ---调试 source-map>cheap-module-source-map>cheap-source-map
   *  -->eval-source-map/eval-cheap-source-map
   * 生产环境：源代码要不要隐藏，调试要不要友好
   *  ---内联会让代码体积变大，所以在生产环境不用内联
   *  nosources-source-map 全部隐藏
   *  hidden-source-map 只隐藏源代码
   *  
   *  source-map / cheap-module-source-map
   */
  devtool: 'cheap-module-source-map'
}
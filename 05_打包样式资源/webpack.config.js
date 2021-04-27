const { resolve } = require("path");

module.exports = {
  //入口文件
  entry: './src/main.js',
  //输出bundle的文职
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
    
  ],
  //生产环境
  mode: 'development',
  //开发环境
  // mode: 'production'
}
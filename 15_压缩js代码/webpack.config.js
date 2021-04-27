const path = require('path');

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
    
  ],
  //使用生产环境压缩js代码
  mode: 'production'
}
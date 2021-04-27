/*
  入口文件index.js，从这开始构建依赖关系图
  打包输出bundle
  生产环境：webpack ./src/index.js -o ./build/built.js --mode=development
  开发环境：webpack ./src/index.js -o ./build/built.js --mode=production
*/

function add(x, y) {
  return x + y;
}

console.log(add(1 + 2));
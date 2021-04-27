const sum = (x, y) => {
  return x + y;
}

console.log(sum(x, y));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('hello');
    resolve('成功');
  }, 1000);
});

promise.then(val => {
  console.log(val);
});
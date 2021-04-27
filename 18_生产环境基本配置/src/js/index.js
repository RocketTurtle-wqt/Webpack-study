import '../css/index.css';

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('成功');
  }, 1000);
});

promise.then((val) => {
  console.log(val);
});

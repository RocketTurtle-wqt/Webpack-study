import './index.css';
import fn from './hello.js';

function add(x, y) {
  return x + y;
}

console.log(add(1, 2))();fn();

if (module.hot) {
  module.hot.accept('./hello.js', function () {
    print();
  });
}
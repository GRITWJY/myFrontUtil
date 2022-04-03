/*
* throttle() 节流
    语法: throttle(callback, wait)
    功能: 创建一个节流函数，在 wait 毫秒内最多执行 callback 一次
* js代码示例
  window.addEventListener('mousemove',throttle(export function (e) {
	  console.log(e)
  },500))
* */

// 普通函数
export function throttle(callback, wait) {
  // 定义开始时间
  let start = 0;

  // 主要就是判断时间间隔,然后是否执行回调而已

  //返回结果是一个函数
  return function (e) {
    //获取当前的时间戳
    let now = Date.now();

    // 判断
    if (now - start >= wait) {
      // 满足条件,执行回调函数
      callback.call(this, e);
      // 修改开始时间
      start = now;
    }
  };
}

// vue指令

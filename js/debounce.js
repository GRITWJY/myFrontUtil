/*
 *
 *
 * 例子: 输入框不是输入一次执行一次,而是等待一段时间后不输入再执行
 * 如果在等待时间执行了，只有最后一次执行，前面的都清掉
 * 所以这里是让timeId = setTineout，执行后才为Null，
 * 这样只要执行时，timeId != NULL， 就说明在等待
 * */

export function debounce(callback, time) {
  // 定时器变量
  let timeId = null;

  //返回一个函数
  return function (e) {
    if (timeId != null) {
      // 清空定时器
      clearTimeout(timeId);
    }

    // 启动定时器
    timeId = setTimeout(() => {
      // 执行回调
      callback.call(this, e);
      // 重置定时器变量
      timeId = null;
    }, time);
  };
}

export function debounce(func, wait, immediate = true) {
  // 定义一个timeout计时器
  let timeout;
  return function () {
    // 如果每次进入函数的时候timeout有值，说明等待时间还没有过，不执行函数，清空timeout
    // 如果没有timeout，则说明过了等待期，可以执行函数
    if (timeout) clearTimeout(timeout);
    // 默认立即执行方法，延后执行的话，会让人感觉有卡顿
    if (immediate) {
      // 定义现在是否能执行
      let now = !timeout;
      if (now) func.apply(this, arguments);
      // 不论timeout有没有值，都重新给timeout新添加一个定时器
      // 等待wait时间后，将timeout设为null，代表可以继续执行次function
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    } else {
      // 如果不是立即执行此函数，则在等待wait时间后执行方法
      timeout = setTimeout(() => {
        func.apply(this, arguments);
      }, wait);
    }
  };
}

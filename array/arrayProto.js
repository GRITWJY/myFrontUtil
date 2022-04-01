/*
 * 数组原型上方法
 * */

// map
function map(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback[(arr[i], i)]);
  }
  return result;
}

// reduce
function reduce(arr, callback, initValue) {
  let result = initValue || 0;
  for (let i = 0; i < arr.length; i++) {
    result = callback(result, arr[i]);
  }
  return result;
}

// filter
function filter(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let res = callback(arr[i], i);
    if (res) {
      result.push(arr[i]);
    }
  }
  return result;
}

// find/findIndex
function find(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    let res = callback(arr[i], i);
    if (res) {
      return arr[i];
      // return i
    }
  }
  return undefined;
}

// every/some
function every(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    let res = callback(arr[i], i);
    if (!res) {
      return false;
    }
  }
  return true;
}

function some(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    let res = callback(arr[i], i);
    if (res) {
      return true;
    }
  }
  return false;
}

// concat
function concat(arr, ...args) {
  const result = [...arr];
  args.forEach((item) => {
    // 如果是数组
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  });
}

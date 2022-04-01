/**
 * 数组扁平化：多维数组——>>一维数组
 * [1,2,[3,4],5,[6,[7,8,9]],10] => [1,2,3,4,5,6,7,8,9,10]
 * 递归+concat
 * 遍历数组中每个元素，如果是数组，就继续遍历下去
 * 如果不是数组，就连接
 * */
function flattern(arr) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flattern(item));
    } else {
      result = result.concat(item);
    }
  });
}

/**
 * some + concat
 * some用于找到第一个是数组的元素
 * concat用于展开数组
 * */
function flattern2(arr) {
  let result = [...arr];
  while (result.some((item) => Array.isArray(item))) {
    result = [].concat(...result);
  }
  return result;
}

/**
 * reduce
 * */
function flattern3(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flattern3(cur) : cur);
  }, []);
}

console.log(flattern3([1, 2, 3, [4, 5], [6, [7, [8]]]]));

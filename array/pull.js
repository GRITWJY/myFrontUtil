/*
 * 删除数组中部分元素
 * */
function pull(arr, ...args) {
  const result = []; // 保存删掉的元素
  for (let i = 0; i < arr.length; i++) {
    if (args.includes(arr[i])) {
      result.push(arr[i]);
      // 注意，这里要用splice
      arr.splice(i, 1);
      // 数组长度减少了，i也要减
      i--;
    }
  }
  return result;
}

/**
 * @description 数组分块: 将数组拆分成多个size长度的区块，每个区块组成小数组，整体组成一个二维数组
 * 如 [1,3,5,6,7,8] 调用chunk(arr,4) ==> [[1,3,5,6],[7,8]]
 *
 * 这一题的处理方法也是我喜欢的，用到了地址
 *
 * 这里，在tmp数组为空时，就把地址存到result里，这样，在之后往tmp里push时，result里面也会有值，就不用管
 *
 * 同时，如果要给tmp更新，直接让它=【】一个新地址，而此前的旧地址不会删除，还是在result里，但tmp却是新的
 * */
function chunk(arr, size = 1) {
  if (arr.length === 0) return [];

  let result = [];
  let tmp = [];
  arr.forEach((item) => {
    if (tmp.length === 0) {
      result.push(tmp);
    }
    tmp.push(item);
    if (tmp.length === size) {
      tmp = [];
    }
  });

  return result;
}

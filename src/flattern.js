// ## 数组扁平化
// 多维数组 -> 一维数组
// 	- 这里最先想到的是递归：如果只有两个数组的情况，就只要遍历时碰到数组就展开数组里面的元素即可。按照这个思路可以先写出递归的主体
//
// - 第二种方法就是...扩展运算符,利用这个特性，只需要循环扩展，直到数组中没有数组即可
//
// 	`[].concat(...[1, 2, 3, [4, 5]]);  // [1, 2, 3, 4, 5]`
/**
 * @description 数组扁平化：多维数组->一维数组
 * [1,2,[3,4,5],6,[7,[8]],9] = > [1,2,3,4,5,6,7,8,9]
 * method1: 递归+reduce+concat
 * */
export function flatten(arr) {
  let result = [] // 空数组
  arr.forEach(item=>{
  	if(Array.isArray(item)) {
  		result = result.concat(flatten(item))
      // 获取数组里面的元素，如上面的【3，4，5】，最后会返回【3，4，5】
    } else {
  		// 不是数组，直接连接
      result = result.concat(item)
    }
  })
}

/**
 * @description 数组扁平化：多维数组->一维数组
 * method1: some+concat
 * */
export function flatten2(arr) {
	// 声明空数组
	let result = [...arr]
	// 循环判断
	while (result.some(item => Array.isArray(item))) {
		result = [].concat(...[result])
	}
	return result
}


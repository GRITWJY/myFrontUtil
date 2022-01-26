Array.prototype.myMap = function (fn) {
	// 判断输入的第一个参数是不是函数
	if (typeof fn !== "function") {
		throw new TypeError(fn + 'is not a function')
	}
	// 获取需要处理的数组内容
	const arr = this
	const len = arr.length

	// 新建一个空数组用于装载新的内容
	const temp = new Array(len)

	// 对数组中每个值进行处理
	for (let i = 0; i < len; i++) {
		let result = fn.call(arguments[1], arr[i], i, arr)
		temp[i] = result
	}

	// 返回新的结果
	return temp
}

function myMap(arr, callback) {
	// 声明一个空数组
	let result = []
	for (let i = 0; i < arr.length; i++) {
		result[i] = callback(arr[i], i)
	}
	return result
}

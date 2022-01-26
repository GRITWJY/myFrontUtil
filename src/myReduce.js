function reduce(arr, callback, initValue) {
	let result = initValue
	for (let i = 0; i < arr.length; i++) {
		result = callback(result, arr[i])
	}
	return result
}

Array.prototype.myReduce = function (fn) {
	if (typeof fn != "function") {
		throw new TypeError(fn + 'is not a function')
	}

	const arr = this
	const len = arr.length
	let value // 最终返回的值
	let k = 0 // 当前索引

	if (arguments.length >= 2) {
		value = arguments[1];
	} else {
		// 当数组为稀疏数组时，判断数组当前是否有元素，如果没有索引加一
		while (k < len && !(k in arr)) {
			k++;
		}
		// 如果数组为空且初始值不存在则报错
		if (k >= len) {
			throw new TypeError('Reduce of empty array with no initial value');
		}
		value = arr[k++];
	}
	while (k < len) {
		if (k in arr) {
			value = fn(value, arr[k], k, arr);
		}
		k++;
	}

	return value;

}

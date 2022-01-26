function myfilter(arr, callback) {
	let result = []
	for (let i = 0; i < arr.length; i++) {
		let res = callback(arr[i], i)
		if (res) {
			result.push(arr[i])
		}
	}
	return result
}


Array.prototype.myFilter = function (fn) {
	if (typeof fn != "function") {
		throw new TypeError(fn + 'is not a function')
	}
	const arr = this
	const len = this.length
	const temp = []
	for (let i = 0; i < len; i++) {
		const result = fn.call(arguments[1], arr[i], i, arr)
		result && temp.push(arr[i])
	}

	return temp

}

// 函数柯里化
function adds() {
	var args = Array.prototype.slice.call(arguments)
	var inner = function () {
		args.push(...arguments)
		return inner
	}

	return inner
}
adds.toString = function () {
	return args.reduce(function (prev, cur) {
		return prev + cur
	})
}

alert(adds(1)(2)(3)(4))

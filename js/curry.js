Function.prototype.curry = function () {
	let slice = Array.prototype.slice
	let defaultArgs = slice.call(arguments)
	let that = this
	return function () {
		return that.apply(this,
				// 类数组对象转为数组
				defaultArgs.concat(slice.call(arguments))
			)
	}
}

let data = [1,2,3,4,5]

data.sort((a,b)=>b-a)

Array.prototype.sortDescending = Array.prototype.sort.curry((a,b)=>b-a)

data.sortDescending()



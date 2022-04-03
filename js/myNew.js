function myNew(Fn, ...args) {
	// 新建一个对象
	const obj = {}

	// 2.修改函数内部this指向新对象，并执行
	// const result = Fn.call(obj,...args)
	const result = Fn.apply(obj, args)

	// 3. 修改新对象的原型对象
	Object.setPrototypeOf(obj, Fn.prototype)
	// obj.__proto__ = Fn.prototype

	return result instanceof Object ? result : obj
}

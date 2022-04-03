export function myInstanceof(obj, Fn) {
	// 目的：判断函数Fn的显示原型是否在实例obj的原型链上
	// 1. 获取显示原型
	let prototype = Fn.prototype

	const proto = Object.getPrototypeOf(obj)
	// let proto = obj.__proto__ // 遍历此

	// Proto！=null
	while (proto) {
		if (proto === prototype) {
			return true
		}
		proto = Object.getPrototypeOf(proto)
		// proto = proto.__proto__
	}
	return false
}

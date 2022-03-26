/*
* bind()
*   语法
*   给fn绑定this为obj, 并指定参数为后面n个参数,不执行
* */
export function bind(Fn, obj, ...args) {
	// 接收参数
	return function (...args2) {
		return call(Fn, obj, ...args, ...args2)
	}
}

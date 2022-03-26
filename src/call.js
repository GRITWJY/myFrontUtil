/*
*  call()
*    语法: call(fn,obj,...args)
*    功能: 执行fn, 使this为obj, 并将后面n个参数传给fn
*  1. 指定为null或undefined时,会自动替换为全局对象,原始值会被包装,
*  2. 返回调用者提供的this值,和参数调用该函数的返回值. 若该方法没有返回值,则返回undefined
* */
export function call(fn,obj,...args) {
	// 如果obj 是undefined/null, this指定为window
	if (obj === undefined || obj === null) {
		obj = window
	}
	// 为obj添加临时方法
	obj.temp = fn

	// 通过obj来调用这个方法 ==> 也就会执行fn函数 ==> 此时fn中的this就是obj的
	const result = obj.temp(...args)

	// 删除临时方法
	delete obj.temp
	return result
}
/*
* apply()
*  语法 : apply(fn,obj,args)
*   特性: args是一个数组,而不是一个一个参数
* 改变函数this指向
* */


export function apply(fn, obj, args) {

	if (obj === undefined || obj === null) {
		obj = window;
	}

	obj.temp = fn;

	const result = obj.temp(...args);

	delete obj.temp;

	return result;
}


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

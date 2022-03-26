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


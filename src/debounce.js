/*
*
*
* 例子: 输入框不是输入一次执行一次,而是等待一段时间后不输入再执行
* 如果在等待时间执行了，只有最后一次执行，前面的都清掉
* 所以这里是让timeId = setTineout，执行后才为Null，
* 这样只要执行时，timeId != NULL， 就说明在等待
* */


export function debounce(callback, time) {
	// 定时器变量
	let timeId = null;

	//返回一个函数
	return function (e) {

		if (timeId != null) {
			// 清空定时器
			clearTimeout(timeId)
		}

		// 启动定时器
		timeId = setTimeout(() => {
			// 执行回调
			callback.call(this, e);
			// 重置定时器变量
			timeId = null
		}, time)
	}

}


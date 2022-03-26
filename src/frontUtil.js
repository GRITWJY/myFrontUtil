/**
 * 前端工具函数库
 * */




export function map(arr, callback) {
	// 声明一个空数组
	let result = [];
	// 遍历数组
	for (let i = 0; i < arr.length; i++) {
		// 执行回调
		result.push(callback(arr[i], i));
	}
	// 返回结果
	return result;

}

/**
 *
 * @param {Array} arr
 * @param {Function} callback
 * @param {*} initValue*/

export function reduce(arr, callback, initValue) {
	// 声明变量
	let result = initValue;
	for (let i = 0; i < arr.length; i++) {
		// 执行回调
		result = callback(result, arr[i]);
	}

	return result
}

/**
 *
 * @param {Array} arr
 * @param {Function} callback
 * */

export function filter(arr, callback) {
	// 声明空数组,接收满足条件结果值
	let result = []
	// 遍历数组
	for (let i = 0; i < arr.length; i++) {
		// 执行回调
		let res = callback(arr[i], i)
		// 判断
		if (res) {
			result.push(arr[i])
		}
	}
	return result
}

/**
 *
 * @param {Array} arr
 * @param {Function} callback
 * */

export function find(arr, callback) {
	// 遍历数组
	for (let i = 0; i < arr.length; i++) {
		let res = callback(arr[i], i);
		if (res) {
			return arr[i];
		}
	}
	return undefined;
}

/**
 *
 * @param {Array} arr
 * @param {Function} callback
 * */

export function findIndex(arr, callback) {
	// 遍历数组
	for (let i = 0; i < arr.length; i++) {
		let res = callback(arr[i], i);
		if (res) {
			return i;
		}
	}
	return -1;
}


/**
 *
 * @param {Array} arr
 * @param {Function} callback
 * */

export function every(arr, callback) {
	// 遍历数组
	for (let i = 0; i < arr.length; i++) {
		let res = callback(arr[i], i);
		if (!res) {
			return false;
		}
	}
	return true;
}

/**
 *
 * @param {Array} arr
 * @param {Function} callback
 * */

export function some(arr, callback) {
	// 遍历数组
	for (let i = 0; i < arr.length; i++) {
		let res = callback(arr[i], i);
		if (res) {
			return true;
		}
	}
	return false;
}

/**
 *  @description method1:本质是双重遍历，效率较差
 * @param {Array} arr
 * */
export function unique(arr) {
	// 声明一个空数组
	const result = []
	arr.forEach(item => {
		// 检测result数组中是否包含此元素
		if (result.indexOf(item) === -1) {
			result.push(item)
		}
	})
	return result
}


/**
 *  @description : 只需一重遍历
 * @param {Array} arr
 * */
export function unique2(arr) {
	// 声明一个空数组
	const result = []
	// 声明空对象
	const obj = {}
	arr.forEach(item => {
		if (obj[item] === undefined) {
			result.push(item)
			obj[item] = true
		}
	})
	return result
}

/**
 *  @description : 利用ES6集合语法
 * @param {Array} arr
 * */
export function unique3(arr) {
	// // 将数组转换为集合Set
	// let set = new Set(arr)
	// // 将set展开
	// return [...set]
	return [...new Set(arr)]
}

/**
 * @description : 数组合并
 * @param {Array} arr
 * */
export function concat(arr, ...args) {
	// 声明一个空数组
	const result = [...arr]
	// 遍历数组
	args.forEach(item => {
		// 判断item是否为数组
		if (Array.isArray(item)) {
			result.push(...item);
		} else {
			result.push(item)
		}
	})

	return result
}

/**
 * @description : 数组切片
 * @param {Array} arr
 * */
export function slice(arr, begin, end) {
	const result = []

	// 判断begin
	begin = begin || 0

	if (begin >= arr.length || arr.length == 0 || begin > end) {
		return []
	}

	end = end || arr.length

	for (let i = 0; i < arr.length; i++) {
		if (i >= begin && i < end) {
			result.push(arr[i])
		}

	}
	return result
}

/**
 * @description 数组分块: 将数组拆分成多个size长度的区块，每个区块组成小数组，整体组成一个二维数组
 * 如 [1,3,5,6,7,8] 调用chunk(arr,4) ==> [[1,3,5,6],[7,8]]
 * */
export function chunk(array, size = 1) {

	if (array.length === 0) {
		return []
	}

	// 声明两个变量
	let result = []
	let tmp = []

	// 遍历
	array.forEach(item => {
		// 判断tmp元素长度是否为0
		if (tmp.length === 0) {
			// 将tmp压入到result中
			result.push(tmp)
		}
		// 将元素加入到临时数组tmp中
		tmp.push(item);
		// 判断
		if (tmp.length === size) {
			tmp = []
		}
	})
	return result
}


/**
 * @description 数组取差集：的到数组中差集
 * */
export function difference(arr1, arr2 = []) {
	if (arr1.length === 0) {
		return []
	}
	if (arr2.length === 0) {
		return arr1.slice()
	}

	const result = arr1.filter(item => !arr2.includes(item))
	return result
}


/**
 * @description 删除数组中部分元素
 * @param {Array} arr
 * @param {...any} args
 * */
export function pull(arr, ...args) {
	// 声明空数组  保存删掉的元素
	const result = [];
	// 遍历arr
	for (let i = 0; i < arr.length; i++) {
		// 判断当前元素是否存在于args数组中
		if (args.includes(arr[i])) {
			// 将当前元素的值存入到result中
			result.push(arr[i])
			// 删除当前元素
			arr.splice(i, 1)
			// 下标自减
			i--
		}
	}
	return result
}

export function pullAll(arr, values) {
	return pull(arr, ...values)
}

/**
 * drop(array,count)
 * 得到当前数组过滤掉左边count个后剩余元素组成的数组
 * 不改变当前数组，count默认是1
 *
 * dropRight
 * */

export function drop(arr, size) {
	//过滤原数组，产生新数组
	return arr.filter((value, index) => index >= size)
}

export function dropRight(arr, size) {
	//过滤原数组，产生新数组
	return arr.filter((value, index) => {
		return index < arr.length - size
	})
}


/******对象相关***/

/**
 * 创建新对象
 * @param{Function} Fn
 * @param{...any} args
 *
 * export function Person(name,age) {
 *   this.name = name;
 *   this.age = age;
 * }
 *
 * let obj = newInstance(Person,'张三',19)
 * console.log(obj)
 * */
export function newInstance(Fn, ...args) {
	// 1.创建一个新对象
	const obj = {};
	// 2.修改函数内部this指向新对象，并执行
	const result = Fn.call(obj, ...args);
	// 修改新对象的原型对象
	obj.__proto__ = Fn.prototype
	// 3.返回新对象
	return result instanceof Object ? result : obj
}

/**
 * myInstanceOf(obj,Type)
 * 检查obj是否是type的实例
 * type的显示原型对象是否是obj的原型链上的某个对象， 如果是则返回true
 * */

export function myInstanceOf(ojb, Fn) {
	// 1. 获取函数的显示原型
	let prototype = Fn.prototype
	// 2. 获取obj的隐式原型对象
	let proto = obj.__proto__

	// 遍历原型链
	while (proto) {
		// 检查原型对象是否相等
		if (prototype === proto) {
			return true
		}
		// 如果不等于
		proto = proto.__proto__
	}
	return false
}


/**
 * 合并多个对象merge,不改变原对象
 * 重名后放在一起
 * */
export function mergeObject(...objs) {
	// 声明一个空对象
	const result = {}
	// 遍历所有参数对象，args包括两个参数
	objs.forEach(obj => {
		// 获取当前对象所有的属性
		Object.keys(obj).forEach(key => {
			// 检测result中是否存在Key属性
			if (result.hasOwnProperty(key)) {
				result[key] = [].concat(result[key], obj[key])
			} else {
				result[key] = obj[key]
			}
		})
	});
}



/**事件监听*
 * 捕获阶段、触发、冒泡
 * 多层嵌套的情况
 * */

// 事件委托,将多个子元素的同类事件监听委托给共同的一个父组件上
/*
<body>
  <ul id="items">
    <li>AAA</li>
    <li id="ldfasf">BBB</li>
    <li>CCC</li>
    <li>DDD</li>
  </ul>
<script>
  addEventListener('#items','click',export function (e) {
	  console.log(this.innerHTML)
  },'#ldfasf')
</script>
</body>
* */

/**
 * 事件委托：重要：点击父元素，绑定子元素
 * @param {string} el 父元素选择器
 * @param {string} type 事件类型
 * @param {Fun} fn 回调
 * @param {string} selector 子元素选择器
 * */
export function addEventListener(el, type, fn, selector) {
	// 判断el的类型
	if (typeof el === 'string') {
		//获取事件源
		el = document.querySelector(el);
	}

	// 事件绑定
	// 若没有传子元素选择器，直接给el绑定事件
	if (!selector) {
		el.addEventListener(type, fn)
	} else {
		el.addEventListener(type, function (e) {
			// 如果是li就执行fn回调，这样就可以为li绑定事件了
			// 1.获取点击的事件源
			const target = e.target;
			// 判断选择器与目标元素是否相符
			if (target.matches(selector)) {
				// 若符合，调用回调
				fn.call(target, e)
			}
		})
	}
}





// 转成驼峰命名
export function Humpnomenclature() {
	let str = 'get-element-by-id'
	let arr = str.split('-')
	for (let i = 1; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1, arr[i].length - 1)
		console.log(arr[i])
	}
	console.log(arr.join(""))


}

// 冒泡排序
export function sort() {
	var arr = [5, 4, 3, 2, 1]


	// 轮数
	for (let i = 0; i < arr.length - 1; i++) {
		// 次数
		for (let j = 0; j < arr.length - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				var temp = arr[j]
				arr[j] = arr[j + 1]
				arr[j + 1] = temp
			}
		}
	}
	console.log(arr)
}

// 反转数组
export function reverse() {
	var arr = [1, 2, 3, 4, 5, 6, 7]
	for (let i = 0; i < arr.length / 2; i++) {
		var temp = arr[i]
		arr[i] = arr[arr.length - i - 1]
		arr[arr.length - i - 1] = temp
	}
	console.log(arr)
}

/*****字符串反转*****/
export function reverseString(str) {
	// 将字符串转为数组，两种方法
	let arr = str.split('')
	let arr2 = [...str]
	arr.reverse()
	arr.join('')
}

// 回文串
export function palindrome(str) {
	return reverseString(str) === str;
}

// 截取字符串
export function truncate(str, size) {
	str.slice(0, size) + '...'
}

// 函数柯里化
function uri_curring(protocol) {
	return function (hostname, pathname) {
		return `${protocol}${hostname}${pathname}`
	}
}

const uri_https = uri_curring("https://")
console.log(uri_https)

// 判断事件监听。用立即执行，这样就可以直接进行判断了
// 这样再使用这个方法时，就可以兼容了
const whichEvent = (function () {
	if (window.addEventListener) {
		return function (element, type, listener, useCapture) {
			element.addEventListener(type, function (e) {
				listener.call(element, e)
			}, useCapture)
		}
	} else if (window.attachEvent) {
		return function (element, type, handler) {
			element.attachEvent('on' + type, function (e) {
				handler.call(element, e)
			})
		}
	}
})()


// 函数柯里化
function adds() {
	var args = Array.prototype.slice.call(arguments)
	var inner = function () {
		args.push(...arguments)
		return inner
	}

	inner.toString = function () {
		return args.reduce(function (prev, cur) {
			return prev + cur
		})
	}

	return inner
}


/**
 总共10个tasks，一次call最多3个，每个task需要完成的时间都不同，请使用以下提供的范本写出能
 完成这10个任务的方法

function tast() {
}

class handleTask {
	constructor(maxCount) {
		this.maxCount = maxCount
		this.pendingTask = []
		this.completed = 0
	}
	run(task){}
}

 */

/**
 * @return {Promise}
 * 写一个执行task的function
 */
function tast() {
	return new Promise(((resolve, reject) => {
		console.log('running')
		setTimeout(resolve(), Math.random() * 10)
	}).then(() => {
		console.log('done')
	}).catch(() => {
		console.log('error')
	}))
}

class handleTask {
	constructor(maxCount) {
		this.maxCount = maxCount
		this.pendingTask = []
		this.completed = 0
		this.count = 0
	}

	run(tasks) {
		if (this.count < this.maxCount) {
			this.count++
			tasks().then(() => {
				this.count--
				this.completed++
				if (this.pendingTask.length > 0) {
					this.run(this.pendingTask.shift())
				}
			})
		} else {
			this.pendingTask.push(tasks)
		}
	}
}


/**
 *
 * @param s string字符串
 * @return bool布尔型
 */
function isValid(s) {
	let arr = []
	for (let i = 0; i < s.length; i++) {
		let temp = s.charAt(i)
		if (temp == '(' || temp == '[' || temp == '{') {
			arr.push(temp)
		} else {
			if (temp == ')') {
				if (arr.length == 0) return false
				if (arr[arr.length - 1] == '(') {
					arr.pop()
				} else {
					return false
				}
			} else if (temp == ']') {
				if (arr.length == 0) return false
				if (arr[arr.length - 1] == '[') {
					arr.pop()
				} else {
					return false
				}
			} else if (temp == '}') {
				if (arr.length == 0) return false
				if (arr[arr.length - 1] == '{') {
					arr.pop()
				} else {
					return false
				}
			}

		}
	}
	if (arr.length == 0) return true
}





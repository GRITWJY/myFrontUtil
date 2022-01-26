/**
 * 前端工具函数库
 * */


/*
* throttle() 节流
    语法: throttle(callback, wait)
    功能: 创建一个节流函数，在 wait 毫秒内最多执行 callback 一次
* js代码示例
  window.addEventListener('mousemove',throttle(export function (e) {
	  console.log(e)
  },500))
* */

export function throttle(callback, wait) {
	// 定义开始时间
	let start = 0;

// 主要就是判断时间间隔,然后是否执行回调而已

	//返回结果是一个函数
	return function (e) {
		//获取当前的时间戳
		let now = Date.now();

		// 判断
		if (now - start >= wait) {
			// 满足条件,执行回调函数
			callback.call(this, e);
			// 修改开始时间
			start = now
		}
	}

}


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


/*
*  call()
*    语法: call(fn,obj,...args)
*    功能: 执行fn, 使this为obj, 并将后面n个参数传给fn
*  1. 指定为null或undefined时,会自动替换为全局对象,原始值会被包装,
*  2. 返回调用者提供的this值,和参数调用该函数的返回值. 若该方法没有返回值,则返回undefined
* */

export function call(fn, obj, ...args) {

	// 如果obj 是undefined/null, this指定为window
	if (obj === undefined || obj === null) {
		obj = window
	}

	// 为obj添加临时的方法
	obj.temp = fn;

	// 通过obj来调用这个方法 ==> 也就会执行fn函数  ==> 此时fn中的this就是obj的
	const result = obj.temp(...args);

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
 * @description 数组扁平化：多维数组->一维数组
 * method1: 递归+reduce+concat
 * */
export function flatten(arr) {
	// 声明空数组
	let result = []
	// 遍历数组
	arr.forEach(item => {
		if (Array.isArray(item)) {
			result = result.concat(flatten(item))
		} else {
			result = result.concat(item)
		}
	})
	return result
}


/**
 * @description 数组扁平化：多维数组->一维数组
 * method1: some+concat
 * */
export function flatten2(arr) {
	// 声明空数组
	let result = [...arr]
	// 循环判断
	while (result.some(item => Array.isArray(item))) {
		result = [].concat([...result])
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


/**
 * 对象拷贝，浅、深
 * */
// 浅拷贝es6
export function clone1(target) {
	// 类型判断
	if (typeof target === 'object' && target !== null) {
		// 判断数据是否为数组
		if (Array.isArray(target)) {
			return [...target]
		} else {
			return {...target}
		}
	} else {
		return target
	}
}

// es5
export function clone2(target) {
	// 判断
	if (typeof target === 'object' && target !== null) {
		// 创建一个容器
		const result = Array.isArray(target) ? [] : {}
		// 遍历target
		for (let key in target) {
			// 判断当前对象身上是否包含该属性
			if (target.hasOwnProperty(key)) {
				// 将属性设置到result中
				result[key] = target[key]
			}
		}
		return result
	} else {
		return target
	}
}


// 深拷贝
// 1.大众乞丐版
// 问题1：函数属性会丢失：JSON不能克隆方法
// 问题2：循环引用会出错：
export function deepClone1(target) {
	// 通过将数据创建JSON格式字符串
	let str = JSON.stringify(target)
	return JSON.parse(str)
}

// 2. 面试基础：递归拷贝
export function deepClone2(target) {
	// 先检测数据的类型
	if (typeof target === 'object' && target !== null) {
		// 创建一个容器
		const result = Array.isArray(target) ? [] : {}
		// 遍历对象
		for (let key in target) {
			// 检测改属性是否为对象本身的属性（不能拷贝原型对象的属性
			if (target.hasOwnProperty(key)) {
				// 拷贝:引用类型需要递归调用
				result[key] = deepClone2(target[key]);
			}
		}
		return result
	} else {
		return target;
	}
}

export function deepClone3(target, map = new Map()) {
	// 先检测数据的类型
	if (typeof target === 'object' && target !== null) {
		// 克隆数据之前，进行判断，判断数据之前是否进行克隆过
		let cache = map.get(target)
		if (cache) {
			return cache
		}
		// 创建一个容器
		const result = Array.isArray(target) ? [] : {}
		// 将新的结果存到容器中
		map.set(target, result)
		// 遍历对象
		for (let key in target) {
			// 检测改属性是否为对象本身的属性（不能拷贝原型对象的属性
			if (target.hasOwnProperty(key)) {
				// 拷贝:引用类型需要递归调用
				result[key] = deepClone3(target[key], map);
			}
		}
		return result
	} else {
		return target;
	}
}


export function deepClone4(target, map = new Map()) {
	// 先检测数据的类型
	if (typeof target === 'object' && target !== null) {
		// 克隆数据之前，进行判断，判断数据之前是否进行克隆过
		let cache = map.get(target)
		if (cache) {
			return cache
		}
		// 创建一个容器
		let isArray = Array.isArray(target)
		const result = isArray ? [] : {}
		// 将新的结果存到容器中
		map.set(target, result)
		// 遍历对象
		// 如果目标数据为数组
		if (isArray) {
			// forEach遍历
			target.forEach((item, index) => {
				result[index] = deepClone4(item, map)
			})
		} else {
			for (let key in target) {
				result[key] = deepClone4(target[key], map)
			}
		}
		return result
	} else {
		return target;
	}
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


/**
 * 事件总线::on,emit,
 * */

export const eventBus = {
	// 保存类型与回调的容器
	callbacks: {}
}
// 绑定事件
eventBus.on = function (type, callback) {
	// 判断
	if (this.callbacks[type]) {
		this.callbacks[type].push(callback)
	} else {
		// 如果callbacks属性中不存在该类型事件，直接存
		this.callbacks[type] = [callback]
	}
}

// 触发事件
eventBus.emit = function (type, data) {
	// 判断
	if (this.callbacks[type] && this.callbacks[type].length > 0) {
		// 遍历数组
		this.callbacks[type].forEach(callback => {
			//执行回调
			callback(data)
		})
	}
}
// 事件解绑
eventBus.off = function (eventName) {
	// 若传入了eventname事件雷属性
	if (eventName) {
		// 只删除对应的
		delete this.callbacks[eventName];
	} else {
		this.callbacks = {}
	}
}


/**
 * 消息订阅与发布
 * PubSub：包含所有功能的订阅、发布消息管理者
 * PubSub.subscribe(msg,subscriber):订阅消息：指定消息明和订阅者回调函数
 * PubSub.publish(msg,data):异步发布消息，指定消息名数据
 * PubSub.publishSync(msg,data):同步发布消息
 * PubSub.unsubsrcibe(flag):取消订阅
 *
 *
 * 对单个订阅进行取消，每个订阅独一无二

 <script>
	// 订阅一个频道
  let pid = PubSub.subscribe('pay',data=>{
	  console.log('商家接单',data)
  })
	let pid2= PubSub.subscribe('pay',data=>{
		console.log('骑手接单',data)
	})
  PubSub.unsubsrcibe('pay')
  PubSub.publish('pay',{
  	title:'jfiasaf',
    price:'20',
    pos:'faufhfjbvjf'
  })
</script>

 * */

export const PubSub = {
	// 订阅唯一id
	id: 1,
	// 频道与回调的容器
	callbacks: {
		// pay: {
		// 	token_1:fn,
		// 	token_2:fn
		// }
	},
}
PubSub.subscribe = function (channel, callback) {
	// 创建唯一编号
	let token = "token_" + this.id++;
	// 判断callback属性中是否存在属性
	if (this.callbacks[channel]) {
		this.callbacks[channel][token] = callback;
	} else {
		this.callbacks[channel] = {
			[token]: callback
		}
	}
	// 返回频道订阅id
	return token
}

PubSub.publish = function (channel, data) {
	// 获取当前频道中所有的回调
	if (this.callbacks[channel]) {
		Object.values(this.callbacks[channel]).forEach(callback => {
			callback(data)
		})
	}
}

//1.没传值
//2. 传入token
//3. msgName字符串
PubSub.unsubsrcibe = function (flag) {
	// 如果flag没有传，清空所有
	if (flag === undefined) {
		this.callbacks = {}
	} else if (typeof flag === 'string') {
		if (flag.indexOf('token') === 0) {
			// 订阅id
			let callbackObj = Object.values(this.callbacks).find(obj => obj.hasOwnProperty(flag))
			if (callbackObj) {
				delete callbackObj[flag];
			}
		} else {
			// 频道名称
			delete this.callbacks[flag]
		}
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



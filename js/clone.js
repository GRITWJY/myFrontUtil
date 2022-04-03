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


// 设计哈希函数
// 1> 将字符串转成比较大的数字：hashCode
// 2> 将大的数字压缩到数据范围之内.数组的大小
function hashFunc(str, size) {
	// 1.定义hashCode=0
	let hashCode = 0

	// 2.霍纳算法，计算hashCode的值
	for (let i = 0; i < str.length; i++) {
		hashCode = (37 * hashCode + str.charCodeAt(i)) % size
	}
	return hashCode
}


// 创建Hash类
class Hash {
	constructor() {
		// 定义属性 :连地址法

		// 存放相关元素
		this.storage = []

		// 加载因子：loadFactor > 0.75 扩容； <0.25:减少
		this.count = 0

		// 限制，数组长度
		this.limit = 7
	}

	// 方法
	hashFunc(str, size) {
		// 1.定义hashCode=0
		let hashCode = 0

		// 2.霍纳算法，计算hashCode的值
		for (let i = 0; i < str.length; i++) {
			hashCode = (37 * hashCode + str.charCodeAt(i)) % size
		}
		return hashCode
	}

	// 插入和修改操作
	put(key, value) {
		// 获取key对应的index
		let index = this.hashFunc(key, this.limit)

		// 2、根据index取对应的bucket
		let bucket = this.storage[index]

		// 3、判断bucket是否为Null
		if (bucket == null) {
			bucket = []
			this.storage[index] = bucket
		}

		// 4、判断是否是修改数据
		for (let i = 0; i < bucket.length; i++) {
			let tuple = bucket[i]
			if (tuple[0] == key) {
				tuple[1] = value
				return
			}
		}
		// 5、添加数据
		bucket.push([key, value])
		this.count += 1
		if (this.count > this.limit * 0.75) {
			let newSize = this.getPrime(this.limit * 2)
			this.resize(newSize)
		}
	}

	// 获取元素
	get(key) {
		let index = this.hashFunc(key, this.limit)
		let bucket = this.storage[index]
		if (bucket == null) {
			return null
		}
		for (let i = 0; i < bucket.length; i++) {
			let tuple = bucket[i]
			if (tuple[0] == key) {
				return tuple[1]
			}
		}
		return null
	}

	// 删除
	remove(key) {
		let index = this.hashFunc(key, this.limit)
		let bucket = this.storage[index]
		if (bucket == null) {
			return null
		}
		for (let i = 0; i < bucket.length; i++) {
			let tuple = bucket[i]
			if (tuple[0] == key) {
				bucket.splice(i, 1)
				this.count--
				if (this.limit > 7 && this.count < this.limit * 0.25) {
					let newSize = this.getPrime(Math.floor(this.limit / 2))
					this.resize(newSize)
				}
				return tuple[1]
			}
		}
		return null
	}

	// 判断hash是否为空
	isEmpty() {
		return this.count === 0
	}

	size() {
		return this.count
	}

	// 哈希表扩容
	resize(newLimit) {
		// 保存旧的数组内容
		let oldStorage = this.storage

		// 2、重置所有属性
		this.storage = []
		this.count = 0
		this.limit = newLimit

		// 3、遍历所有的bucket
		for (let i = 0; i < oldStorage.length; i++) {
			let bucket = oldStorage[i]
			if (bucket == null) {
				continue
			}
			for (let j = 0; j < bucket.length; j++) {
				var tuple = bucket[j]
				this.put(...tuple)
			}
		}
		oldStorage = null
	}

	isPrime(num) {
		let temp = parseInt(Math.sqrt(num))
		for (let i = 2; i <= temp; i++) {
			if (num % i == 0) {
				return false
			}
		}
		return true
	}

	// 获取质数
	getPrime(num) {
		while (!this.isPrime(num)) {
			num++
		}
		return num
	}
}

let ht = new Hash()
console.log(ht.getPrime(14))

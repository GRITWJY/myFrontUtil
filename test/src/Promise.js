/**
 * Promise函数
 * */

class Promise {
	constructor(executor) {
		this.promiseState = 'pending'
		this.promiseResult = null
		this.callbacks = []
		const self = this

		function resolve(data) {
			if (self.promiseState === 'pending') {
				self.promiseState = 'fullfilled'
				self.promiseResult = data

				setTimeout(() => {
					self.callbacks.forEach(item => {
						item.onResolved(data)
					})
				})
			}

		}

		function reject(data) {
			if (self.promiseState === 'pending') {
				self.promiseState = 'rejected'
				self.promiseResult = data

				setTimeout(() => {
					self.callbacks.forEach(item => {
						item.onRejected(data)
					})
				})
			}
		}

		try {
			executor(resolve, reject)
		} catch (e) {
			reject(e)
		}
	}

	then(onResolved, onRejected) {
		const self = this
		if (typeof onRejected !== 'function') {
			onRejected = reason => {
				throw reason
			}
		}
		if (typeof onResolved !== 'function') {
			onResolved = value => value
		}

		return new Promise((resolve, reject) => {
			function callback(type) {
				try {
					let result = type(self.promiseResult)
					if (result instanceof Promise) {
						result.then(v => {
							resolve(v)
						}, r => {
							reject(r)
						})
					} else {
						resolve(result)
					}
				} catch (e) {
					reject(e)
				}
			}

			if (this.promiseState === 'fullfilled') {
				setTimeout(() => {
					callback(onResolved)
				})
			}

			if (this.promiseState === 'rejected') {
				setTimeout(() => {
					callback(onRejected)
				})
			}

			if (this.promiseState === 'pending') {
				this.callbacks.push({
					onRejected: function () {
						callback(onRejected)
					},
					onResolved: function () {
						callback(onResolved)
					}
				})
			}
		})
	}

	catch(onRejected) {
		return this.then(undefined, onRejected)
	}

	static resolve(value) {
		return new Promise((resole, reject) => {
			if (value instanceof Promise) {
				value.then(v => {
					resolve(V)
				}, r => {
					reject(r)
				})
			} else {
				resolve(value)
			}

		})
	}

	static reject(reason) {
		return new Promise((resole, reject) => {
			reject(reason)
		})
	}

	static all(promises) {
		return new Promise((resolve, reject) => {
			let count = 0
			let arr = []
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(v => {
					count++
					arr[i] = v
					if (count === promises.length) {
						resolve(arr)
					}
				}, r => {
					reject(r)
				})
			}
		})
	}

	static race(promises) {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(v => {
					resolve(arr)
				}, r => {
					reject(r)
				})
			}
		})
	}

}

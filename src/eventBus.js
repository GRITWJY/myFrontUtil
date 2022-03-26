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


/*
* 拆分代码段
* */

class Task {
	constructor() {
		this.tasks = []
	}

	// 添加一个task
	addTask(task) {
		this.tasks.push(task)
	}

	// 每次重绘前取一个task执行
	draw() {
		let _this = this
		window.requestAnimationFrame(function () {
			let tasks = _this.tasks
			if (tasks.length) {
				let task = tasks.shift()
				task()
			}
			window.requestAnimationFrame(function () {
				_this.draw.call(_this)
			})
		})
	}
}


// 使用的时候先创建一个Task，然后draw初始化。
// 再封装一个mapTask的单例

let aTask = null
let mapTask = {
	get:function () {
		if (!aTask) {
			aTask = new Task();
			aTask.draw()
		}
		return aTask
	},
	add:function (task) {
		mapTask.get().addTask(task)
	}

}



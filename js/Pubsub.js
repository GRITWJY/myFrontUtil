/**
 * 消息订阅与发布
 * PubSub：包含所有功能的订阅、发布消息管理者
 * PubSub.subscribe(msg,subscriber):订阅消息：指定消息名和订阅者回调函数
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
		this.callbacks[channel] =
			{
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

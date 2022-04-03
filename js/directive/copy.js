/*
需求：实现一键复制文本内容，用于鼠标有点粘贴
思路：
1.动态创建textarea标签，并设置readOnly属性及移出可视区域
2.将要复制的值赋给textarea标签的value属性，并插入到body
3.选中值textarea并复制
4.将body中插入的textarea移除
5.在第一次调用时绑定事件，在解绑时移除事件

作者：MK麦客
链接：https://juejin.cn/post/7067051410671534116
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */

const copy = {
	// value是要复制的内容,作为绑定值使用
	bind(el, {value}) {
		console.log(value)
		el.$value = value
		//自定义的处理函数。处理函数有时候也被成为“劫持”（traps），这是由于它们会对底层被代理对象的调用进行劫持。
		el.handler = () => {
			if (!el.$value) {
				console.log('无复制内容')
				return
			}
			// 动态创建textarea标签
			const textarea = document.createElement('textarea')
			// 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
			textarea.readOnly = 'readonly'
			textarea.style.position = 'absolute'
			textarea.style.left = '-9999px'
			// 将要 copy 的值赋给 textarea 标签的 value 属性
			textarea.value = el.$value
			// 将 textarea 插入到 body 中
			document.body.appendChild(textarea)
			// 选中值并复制，用来设定当前选中的内容 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/select_event
			textarea.select()
			// 用法可看MDN https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
			const result = document.execCommand('copy')
			if (result) {
				console.log('复制成功') // 可根据项目UI仔细设计
			}
			// 复制之后移除节点
			document.body.removeChild(textarea)

		}
		// 绑定点击事件，就是所谓的一键 copy 啦
		el.addEventListener('click', el.handler)
	},
	// 当传进来的值更新的时候触发
	componentUpdated(el, { value }) {
		el.$value = value
	},
	// 指令与元素解绑的时候，移除事件绑定
	unbind(el) {
		el.removeEventListener('click', el.handler)
	}
}

export default copy

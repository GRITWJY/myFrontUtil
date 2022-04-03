/*
背景：在一些后台管理系统，我们可能需要根据用户角色进行一些操作权限的判断，很多时候我们都是粗暴地给一个元素添加v-if / v-show来进行显示隐藏，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。针对这种情况，我们可以通过全局自定义指令来处理。
需求：自定义一个权限指令，对需要权限判断的 Dom 进行显示隐藏。
思路：

自定义一个权限数组
判断用户的权限是否在这个数组内，如果是则显示，否则则移除 Dom

 */
function checkArray(key) {
	let arr = ['1', '2', '3', '4']
	let index = arr.indexOf(key)
	if (index > -1) {
		return true // 有权限
	} else {
		return false // 无权限
	}
}

const permission = {
	inserted: function (el, binding) {
		let permission = binding.value // 获取到 v-permission的值
		if (permission) {
			let hasPermission = checkArray(permission)
			if (!hasPermission) {
				// 没有权限 移除Dom元素
				el.parentNode && el.parentNode.removeChild(el)
			}
		}
	},
}

export default permission

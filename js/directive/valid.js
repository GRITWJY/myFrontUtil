/*
背景，在开发中遇到表单验证时，对表单的验证挺麻烦的还，不仅要重复很多次正则，
而且搞不好就出现什么不可预料的情况。el-form。

这里可以用指令来解决

需求：根据正则表达式，设计自定义处理表单输入规则的指令，下面以表情和额数字符为例。

如果想要多个地方调用，判断不同情况，可以在里面几个if判断即可，判断binding.value的值

这样就可以实现全局共用一个输入框验证了
 */

/**
 * 校验失败
 * @param el
 */
let testError = (el) => {
	el.style.borderColor = '#d20000'
	el.style.backgroundColor = '#fff8f8'
}

/**
 * 校验成功
 * @param el
 */

let testCorrect = (el) => {
	el.style.borderColor = '#a3a3a3'
	el.nextElementSibling.innerHTML = ''
	el.style.backgroundColor = 'transparent'
}

/**
 * 校验用户名
 * @param username
 * @param el
 * @returns {boolean}
 */
let testUserName = (username, el) => {
	if (/^\w{3,30}$/g.test(username)) {
		testCorrect(el)
		return true
	} else {
		testError(el)
		let dom = el.nextElementSibling
		console.log(dom)
		dom.innerHTML = 'Username must be 3 to 30 characters'
		return false
	}
}


/**
 * 校验邮箱
 * @param email
 * @param el
 * @returns {boolean}
 */
let testEmail = (email, el) => {
	if (/^[\w-]+@[\w-]+(\.[\w-]+)+$/g.test(email)) {
		testCorrect(el)
		return true
	} else {
		testError(el)
		el.nextElementSibling.innerHTML = 'Mailbox format is not correct!'
		return false
	}
}


/**
 * 校验密码
 * @param pwd
 * @param el
 * @returns {boolean}
 */
let testPwd = (pwd, el) => {
	if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g.test(pwd)) {
		testCorrect(el)
		return true
	} else {
		testError(el)
		let dom = el.nextElementSibling
		dom.innerHTML = 'Password must be 6 to 30 characters'
		return false
	}
}

const valid = {
	inserted: function (el, binding) {
		el.addEventListener('blur', () => {
			switch (binding.value[0]) {
				case 'username':
					testUserName(binding.def[binding.rawName], el);
					break
				case 'email' :
					testEmail(binding.def[binding.rawName], el);
					break
				case 'password' :
					testPwd(binding.def[binding.rawName], el);
					break
			}
		})
	},
	update: function (el, binding, vNode) {
		if (binding.value) {
			binding.def[binding.rawName] = binding.value[1]
		}
	}
}


export default valid

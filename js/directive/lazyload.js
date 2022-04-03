/*
背景：在类电商类项目，往往存在大量的图片，如 banner 广告图，菜单导航图，美团等商家列表头图等。图片众多以及图片体积过大往往会影响页面加载速度，造成不良的用户体验，所以进行图片懒加载优化势在必行。
需求：实现一个图片懒加载指令，只加载浏览器可见区域的图片。
思路：

图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的
拿到所有的图片 Dom ，遍历每个图片判断当前图片是否到了可视区范围内
如果到了就设置图片的src属性，否则显示默认图片

图片懒加载有两种方式可以实现，一是绑定srcoll事件进行监听，二是使用IntersectionObserver判断图片是否到了可视区域，但是有浏览器兼容性问题。
下面封装一个懒加载指令兼容两种方法，判断浏览器是否支持IntersectionObserverAPI，如果支持就使用IntersectionObserver实现懒加载，否则则使用srcoll事件监听 + 节流的方法实现。

 */


const LazyLoad = {
	// install方法
	install(Vue, options) {
		Vue.directive('lazyload', {
			bind(el, binding) {
				LazyLoad.init(el, binding.value)
			},

			inserted(el) {
				if (IntersectionObserver) {
					LazyLoad.observe(el)
				} else {
					LazyLoad.listenerScroll(el)
				}
			}
		})
	},

	// 初始化
	init(el, val) {
		el.setAttribute('data-src', val)
		el.setAttribute('src', '')
	},
	observe(el) {
		//IntersectionObserver接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。

		//当一个IntersectionObserver对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦IntersectionObserver被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。
		var io = new IntersectionObserver(entries => {
			const realSrc = el.dataset.src
			if (entries[0].isIntersecting) {
				if (realSrc) {
					el.src = realSrc
					el.removeAttribute('data-src')
				}
			}
		})
		io.observe(el)
	},

	listenerScroll(el) {
		const handler = LazyLoad.throttle(LazyLoad.load, 300)
	},

	load(el) {
		const windowHeight = document.documentElement.clientHeight
		// Element.getBoundingClientRect()方法会返回元素的大小和相对于视口的位置
		const elTop = el.getBoundingClientRect().top
		const elBtm = el.getBoundingClientRect().bottom

		const realSrc = el.dataset.src
		if (elTop - windowHeight < 0 && elBtm > 0) {
			if (realSrc) {
				el.src = realSrc
				el.removeAttribute('data-src')
			}
		}

	},

	// 节流
	throttle(fn, delay) {
		let timer
		let prevTime
		return function (...args) {
			const currTime = Date.now()
			const context = this

			if (!prevTime) prevTime = currTime
			clearTimeout(timer)
			if (currTime - prevTime > delay) {
				prevTime = currTime
				fn.apply(context, args)
				clearTimeout(timer)
				return
			}
			timer = setTimeout(function () {
				prevTime = Date.now()
				timer = null
				fn.apply(context, args)
			}, delay)

		}

	}


}

export default LazyLoad

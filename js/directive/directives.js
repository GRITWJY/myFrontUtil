import copy from "@/directive/copy";
import longpress from '@/directive/longpress'
import debounce from "@/directive/debounce";
import valid from "@/directive/valid";
import permission from "@/directive/permission";
import draggable from "@/directive/drag";

const directives = {
	copy,
	longpress,
	debounce,
	valid,
	permission,
	draggable
}

export default {
	install(Vue) {
		Object.keys(directives).forEach((key) => {
			Vue.directive(key, directives[key])
		})
	}
}

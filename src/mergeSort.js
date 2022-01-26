function mergeSort(arr) {
	if (arr == null || arr.length <= 0) {
		return []
	}
	sortProcess(arr, 0, arr.length - 1)
	return arr
}

function sortProcess(arr, L, R) {
	// 递归终止条件，就是左右边界索引一样
	if (L == R) {
		return
	}
	let middle = L + ((R - L) >> 1) // 找出中间值
	sortProcess(arr, L, middle) // 对左侧部分进行递归
	sortProcess(arr, middle + 1, R) // 对右侧部分进行递归
	merge(arr, L, middle, R) // 然后利用外派方式进行结合
}

function merge(arr, L, middle, R) {
	let help = []
	let l = L
	let r = middle + 1
	let index = 0

	// 利用外排方式进行
	while (l <= middle && r <= R) {
		help[index++] = arr[l] < arr[r] ? arr[l++] : arr[r++]
	}

	while (l <= middle) {
		help.push(arr[l++])
	}

	while (r <= R) {
		help.push(arr[r++])
	}

	arr.splice(L, help.length, ...help)
}

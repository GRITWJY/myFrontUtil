/*
* 给出一个整型数组 numbers 和一个目标值 target，请在数组中找出两个加起来等于目标值的数的下标，返回的下标按升序排列。
* */

/**
 * map的使用
 * @param numbers int整型一维数组
 * @param target int整型
 * @return int整型一维数组
 */
function twoSum(numbers, target) {
	const map = new Map()
	for (let i = 0; i < numbers.length; i++) {
		const res = target - numbers[i]
		if (map.has(res)) {
			return [map.get(res), i + 1]
		} else {
			map.set(numbers[i], i + 1)
		}
	}
}

console.log(twoSum([3, 2, 4], 6))

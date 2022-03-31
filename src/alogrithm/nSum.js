//
/**
 * 给出一个整型数组 numbers 和一个目标值 target，请在数组中找出两个加起来等于目标值的数的下标，返回的下标按升序排列。
 * @param numbers int整型一维数组
 * @param target int整型
 * @return int整型一维数组
 */
export function towSum(numbers, target) {
  let rest = {};
  for (let i = 0; i < numbers.length; i++) {
    let res = target - numbers[i];
    if (rest[res]) {
      return [rest[res], i + 1];
    } else {
      rest[numbers[i]] = i + 1;
    }
  }
  return [];
}

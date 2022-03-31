/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 * 思路：注意：这里的题目是只能1或2，那么就是简单的斐波那契数列的问题了
 * 这里给出这类问题的一般思路和步骤

  对于本题,前提只有 一次 1阶或者2阶的跳法。

a.如果两种跳法，1阶或者2阶，那么假定第一次跳的是一阶，那么剩下的是n-1个台阶，跳法是f(n-1);

b.假定第一次跳的是2阶，那么剩下的是n-2个台阶，跳法是f(n-2)

c.由a\b假设可以得出总跳法为: f(n) = f(n-1) + f(n-2)

d.然后通过实际的情况可以得出：只有一阶的时候 f(1) = 1 ,只有两阶的时候可以有 f(2) = 2

e.可以发现最终得出的是一个斐波那契数列：

        | 1, (n=1)
f(n) =  | 2, (n=2)
        | f(n-1)+f(n-2) ,(n>2,n为整数)

 * @param number
 * @returns {*}
 */
function jumpFloor(number) {
  const res = [];
  res[1] = 1;
  res[2] = 2;
  if (number > 2) {
    for (let i = 3; i <= number; i++) {
      res[i] = res[i - 1] + res[i - 2];
    }
  }
  return res[number];
}

/**
 * 现在有2副扑克牌，从扑克牌中随机五张扑克牌，我们需要来判断一下是不是顺子。
有如下规则：
1. A为1，J为11，Q为12，K为13，A不能视为14
2. 大、小王为 0，0可以看作任意牌
3. 如果给出的五张牌能组成顺子（即这五张牌是连续的）就输出true，否则就输出false。
4.数据保证每组5个数字，每组最多含有4个零，数组的数取值为 [0, 13]

 * @param numbers
 * @constructor
 */
function IsContinuous(numbers) {
  //1、获取非0的数组
  let numsList = numbers.filter((item) => {
    return item;
  });

  // 2.数组去重
  let map = Array.from(new Set(numsList));

  if (map.length < numsList.length) {
    return false;
  }
  let gap = Math.max(...numsList) - Math.min(...numsList);

  return gap <= 4;
}

/**
 * 最小的k个数
 * @param input
 * @param k
 * @constructor
 */
function GetLeastNumbers_Solution(input, k) {
  if (k > input.length) return (input.length = 0);
  input.sort((a, b) => a - b);
  input.length = k;
  return input;
}

/**
 * 最长无重复子数组/子串
 * @param arr
 */
function maxLength(arr) {
  let res = [];
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    let idx = res.indexOf(arr[i]);
    if (idx != -1) {
      res.splice(0, idx + 1);
    }
    res.push(arr[i]);
    max = Math.max(res.length, max);
  }
  return max;
}

/**
 * 最长公共子串
 * longest common substring
 * @param str1 string字符串 the string
 * @param str2 string字符串 the string
 * @return string字符串
 */
function LCS(str1, str2) {
  if (str1.length === 0 || str2.length === 0) {
    return "";
  }
  if (str1.length > str2.length) {
    [str1, str2] = [str2, str1];
  }
}

function test1(n, user, q, ques) {
  for (let i = 0; i < q; i++) {
    let arr = user.slice(ques[i][0] - 1, ques[i][1]);
    if (arr.includes(ques[i][2])) {
      let sum = 0;
      arr.map((item) => {
        if (item === ques[i][2]) {
          sum++;
        }
      });
      console.log(sum);
    } else {
      console.log(0);
    }
  }
}

function BinarySearchMax(data, target) {
  let left = 0;

  let right = data.length - 1;
  while (left < right) {
    let mid = (left + right) / 2;
    if (data[mid] <= target) left = mid;
    else right = mid - 1;
  }
  if (data[left] == target) return left;
  return -1;
}

function maxSubmatrixSum(matrix, n, m) {
  let base_sum;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      base_sum += matrix[i][j];
    }
  }

  let result = 0;

  for (let i = 0; i + n < matrix.length; i++) {
    if (i > 0) {
      for (let y = 0; y < m; y++) {
        base_sum += matrix[i + n][y] - matrix[i - 1][y];
      }
    }
    let real_sum = base_sum;
    if (real_sum > result) {
      result = real_sum;
    }
    for (let j = 0; j + m < matrix.length; j++) {
      for (let x = 0; x < n; x++) {
        real_sum += matrix[x][j + m] - matrix[x][j - 1];
      }
      if (real_sum > result) {
        result = real_sum;
      }
    }
  }
  return result;
}

let n = Number(readline());
let rawStr = readline();
let min = n;
let left = 0,
  right = 0;
// 1的个数
for (let i = 0; i < n; i++) {
	if (rawStr[i] == '1') ++right
}

for (let i = 0; i <= n; i++) {
	if (i>0) {
		if (rawStr[i-1] =='0') {
			left++
		} else {
			right--
		}
	}
	if (left + right < min) min = left+right
}



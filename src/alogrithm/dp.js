/**
 * 输入一个长度为n的整型数组array，数组中的一个或连续多个整数组成一个子数组，子数组最小长度为1。求所有子数组的和的最大值。
 * 思路：动态规划
 * temp初始值为0
 * temp: 每次遍历后，以array[i]结尾的子数组和的最大值。将当前的array[i]，与array[i]+temp比较，取最大的即可
 * res 所有子数组和的最大值
 *
 * @param array
 * @returns {number}
 * @constructor
 */
function FindGreatestSumOfSubArray(array) {
  let temp = 0;
  let res = array[0];
  for (let i = 0; i < array.length; i++) {
    temp = Math.max(array[i], array[i] + temp);
    res = Math.max(temp, res);
  }
  return res;
}

/**
 *不同路径的数目(一)
 * @param m int整型
 * @param n int整型
 * @return int整型
 */
function uniquePaths(m, n) {
  let dp = new Array(m);
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n);
    dp[i][0] = 1;
  }

  for (let i = 0; i < n; i++) {
    dp[0][i] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

/**
 * 兑换零钱
 * @param arr
 * @param aim
 */
function minMoney(arr, aim) {
  let dp = new Array(aim + 1);
  for (let i = 1; i <= aim; i++) dp[i] = Infinity;
  dp[0] = 0;
  for (let i = 1; i <= aim; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] <= i) {
        dp[i] = Math.min(dp[i], (dp[i - arr[j]] || 0) + 1);
      }
    }
  }
  return dp[aim] > aim ? -1 : dp[aim];
}

/**
 * 01背包
 *
 *
 * @param V int整型 背包的体积
 * @param n int整型 物品的个数
 * @param vw int整型二维数组 第一维度为n,第二维度为2的二维数组,vw[i][0],vw[i][1]分别描述i+1个物品的vi,wi
 * @return int整型
 */
function knapsack(V, n, vw) {
  const dp = new Array(V + 1).fill(0);
  let max = 0;

  for (let i = 0; i < n; i++) {
    for (let j = V; j >= vw[i][0]; j--) {
      dp[j] = Math.max(dp[j], vw[i][1] + dp[j - vw[i][0]]);
    }
  }

  return dp[V];
}

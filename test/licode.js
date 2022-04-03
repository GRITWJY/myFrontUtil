/*
*
* 给你一个下标从 0 开始的整数数组 nums ，其中 nums[i] 是 0 到 9 之间（两者都包含）的一个数字。

nums 的 三角和 是执行以下操作以后最后剩下元素的值：

nums 初始包含 n 个元素。如果 n == 1 ，终止 操作。否则，创建 一个新的下标从 0 开始的长度为 n - 1 的整数数组 newNums 。
对于满足 0 <= i < n - 1 的下标 i ，newNums[i] 赋值 为 (nums[i] + nums[i+1]) % 10 ，% 表示取余运算。
将 newNums 替换 数组 nums 。
从步骤 1 开始 重复 整个过程。
请你返回 nums 的三角和。
* */

var triangularSum = function (nums) {
  function f() {
    let n = nums.length;
    if (n == 1) {
      return nums[0];
    }

    let newNums = new Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
      newNums[i] = (nums[i] + nums[i + 1]) % 10;
    }
    nums = newNums;
    return f();
  }
  return f();
};

// console.log(triangularSum([1, 2, 3, 4, 5]));

/**
 * @param {string} s
 * @return {number}
 */
var numberOfWays = function (s) {
  let sum = 0;
  for (let i = 0; i <= s.length - 3; i++) {
    if (s[i] == "0") {
      for (let j = i + 1; j <= s.length - 2; j++) {
        if (s[j] === "1") {
          for (let k = j + 1; k <= s.length - 1; k++) {
            if (s[k] == "0") {
              sum++;
            }
          }
        }
      }
    }

    if (s[i] == "1") {
      for (let h = i + 1; h <= s.length - 2; h++) {
        if (s[h] === "1") {
          for (let m = h + 1; m <= s.length - 1; m++) {
            if (s[m] == "0") {
              sum++;
            }
          }
        }
      }
    }
  }
  console.log(sum);
};

var numberOfWays2 = function (s) {
  let sum = 0;
  function f(i, res) {
    if (i == s.length) {
      if (res === "010" || res === "101") {
        console.log(i, res);
        sum++;
      }
      return;
    } else {
      f(i + 1, res);
      f(i + 1, res + s[i]);
    }
  }
  f(0, "");
  console.log(sum);
};

var numberOfWays3 = function (s) {
  function f(t) {
    let a = 0,
      b = 0,
      c = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] == t[2]) c += b;
      if (s[i] == t[1]) b += a;
      if (s[i] == t[0]) a += 1;
    }
    return c;
  }
  return f("101") + f("010");
};

console.log(numberOfWays3("001101"));

/**
 * @param {string} s
 * @return {number}
 */
var sumScores = function (s) {
  let sum = 0;
  for (let i = 1; i <= s.length; i++) {
    let t = s.slice(s.length - i, s.length);
    if (t[0] != s[0]) {
      continue;
    } else {
      sum += getCommonLen(s, t);
    }
  }
  console.log(sum);
};
function getCommonLen(s, t) {
  console.log(s, t);
  let tn = t.length,
    sn = s.length;
  let i = 0;
  let res = 0;
  while (i < tn && i < sn && s[i] == t[i]) {
    res++;
    i++;
  }
  return res;
}
// sumScores("babab");

function maxSameStr(str) {
  str = str.split("");
  var subfixArr = (function () {
    var returnArr = [];
    for (var i = 0; i < str.length; i++) {
      returnArr[i] = str.slice(i, str.length);
    }
    return returnArr.sort();
  })();
  var comlen = function (str1, str2) {
    var i = 0;
    while (str[i] && str1[i] == str2[i]) i++;
    return i;
  };
  var maxlen = 0;
  var maxIndex = -1;
  for (var i = 0; i < str.length - 1; i++) {
    var temp = comlen(subfixArr[i], subfixArr[i + 1]);
    if (temp > maxlen) {
      maxlen = temp;
      maxIndex = i;
    }
  }
  if (maxIndex == -1) return;
  return [subfixArr[maxIndex].slice(0, maxlen).join(""), maxlen];
}

// console.log(maxSameStr("azbazbzaz"));

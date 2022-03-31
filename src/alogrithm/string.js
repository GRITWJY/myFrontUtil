/**
 * 最长公共前缀
 * @param strs
 * @returns {string|*}
 */
let longestCommonPerfix = function (strs) {
  let first = strs[0];
  if (first === "" || first === undefined) return "";
  let minLen = 9999;
  for (let i = 1; i < strs.length; i++) {
    const len = towStrLongestCommonPrefix(first, strs[i]);
    minLen = Math.min(len, minLen);
  }
  return first.slice(0, minLen);
};

function towStrLongestCommonPrefix(s, t) {
  let i = 0,
    j = 0;
  let cnt = 0;
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      cnt++;
    } else {
      return cnt;
    }
    i++;
    j++;
  }
  return cnt;
}

/**
 * 是否是回文数字
 *
 * @param x
 */
function isPalindrome(x) {
  // write code here

  return x.toString() === x.toString().split("").reverse().join("");
}

console.log(isPalindrome(1232));

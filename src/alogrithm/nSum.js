// 给出一个整型数组 numbers 和一个目标值 target，请在数组中找出两个加起来等于目标值的数的下标，返回的下标按升序排列。

/**
 *
 * @param numbers int整型一维数组
 * @param target int整型
 * @return int整型一维数组
 */
function twoSum(numbers, target) {
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
  // write code here
}

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
 * 合并两个有序的数组
 * @param A int整型一维数组
 * @param B int整型一维数组
 * @return void
 */
function merge(A, m, B, n) {
  // write code here
  for (let i = 0; i < n; i++) {
    A.push(B[i]);
  }
  return A.sort((a, b) => {
    return a - b;
  });
}

/**
 *
 * @param matrix int整型二维数组
 * @return int整型一维数组
 */

/*
 * 1 2 3 4
 * 4 5 6 5
 * 7 8 9 6
 * 7 8 9 5
 *
 *
 * 第一层
 * [0][1,2,3,4]
 * [1,2,3,4][4]
 * [4][4,3,2,1]
 * [4,3,2,1][1]
 *
 * 第二层
 * [1][2,3]
 * [2,3][3]
 * [3][3,2]
 * [3,2][2]
 *
 *
 *
 * */

function spiralOrder(matrix) {
  let res = [];
  if (matrix.length === 0) return res;
  let l = 0,
    r = matrix[0].length - 1;
  let t = 0,
    b = matrix.length - 1;
  while (1) {
    for (let i = l; i <= r; i++) {
      res.push(matrix[t][i]);
    }
    if (++t > b) break;
    for (let i = t; i <= b; i++) {
      res.push(matrix[i][r]);
    }
    if (--r < l) break;
    for (let i = r; i >= l; i--) {
      res.push(matrix[b][i]);
    }
    if (--b < t) break;
    for (let i = b; i >= t; i--) {
      res.push(matrix[i][l]);
    }
    if (++l > r) break;
  }
  return res;
}

/**
 *
 * @param x int整型
 * @return int整型
 */
function sqrt(x) {
  let left = 1,
    right = x;

  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    console.log(left, right, mid);

    if (mid ** 2 === x) {
      return mid;
    } else if (mid ** 2 > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left - 1;
}

/**
 *
 * @param nums int整型一维数组
 * @param target int整型
 * @return int整型
 */
function search(nums, target) {
  return nums.indexOf(target);
}

/**
 * 买股票的最佳时机
 * @param prices int整型一维数组
 * @return int整型
 */
function maxProfit(prices) {
  let minprice = 999999,
    maxprofit = 0;
  prices.forEach((item) => {
    maxprofit = Math.max(item - minprice, maxprofit);
    minprice = Math.min(item, minprice);
  });
  return maxprofit;
}

/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 二叉树的最大深度
 * @param root TreeNode类
 * @return int整型
 */
function maxDepth(root) {
  // write code here

  if (root == null) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

/**
 *
 * @param head ListNode类 the head node
 * @return ListNode类
 */
function sortInList(head) {
  if (head == null || head.next == null) {
    return head;
  }

  let low = head;
  let fast = head.next;
  while (fast != null && fast.next != null) {
    low = low.next;
    fast = fast.next.next;
  }
  let newList = low.next;
  low.next = null;
  let left = sortInList(head);
  let right = sortInList(newList);
  let result = new ListNode();
  let cur = result;
  while (left != null && right != null) {
    if (left.val < right.val) {
      result.next = left;
      left = left.next;
    } else {
      result.next = right;
      right = right.next;
    }
    result = result.next;
  }
  result.next = left != null ? left : right;
  return cur.next;
}

/**
 * 是否是平衡二叉树
 * */
function IsBalanced_Solution(pRoot) {
  if (!pRoot) {
    return true;
  }
  return (
    Math.abs(maxDepth(pRoot.left) - maxDepth(pRoot.right)) <= 1 &&
    IsBalanced_Solution(pRoot.left) &&
    IsBalanced_Solution(pRoot.right)
  );
}

/**
 *  数组中出现次数超过一半的数字
 * */
function MoreThanHalfNum_Solution(numbers) {
  let cout = {};
  let res;
  for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    cout[num] ? cout[num]++ : (cout[num] = 1);
    if (cout[num] > numbers.length / 2) {
      res = num;
      break;
    }
  }
  return res;
}

/**
 * 链表是否是回文链表
 * @param head ListNode类 the head
 * @return bool布尔型
 */
function isPail(head) {
  let low = head,
    fast = head.next;

  while (fast != null && fast.next != null) {
    low = low.next;
    fast = fast.next.next;
  }

  // Low就是重点
  // 1,2,3,4,5,6  3
  // 1,2,3,4,5,6,7  4
  // 反转从low到end的链表
  let pre = null,
    rightHead = low.next,
    temp = null;
  while (rightHead != null) {
    temp = rightHead.next;
    rightHead.next = pre;
    pre = rightHead;
    rightHead = temp;
  }

  let right = pre; // 反转后的头结点
  let left = head;
  while (right != null) {
    if (left.val != right.val) {
      return false;
    }
    left = left.next;
    right = right.next;
  }
  return true;
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

function isSame(left, right) {
  if (!left && !right) return true;
  if (!left || !right) return false;
  return (
    left.val === right.val &&
    isSame(left.left, right.right) &&
    isSame(left.right, right.left)
  );
}

// 是否是对称二叉树
function isSymmetrical(pRoot) {
  return isSame(pRoot, pRoot);
}

// 二叉树中是否有一个路径，其上和为sum，注意叶子节点没有左右节点
function hasPathSum(root, sum) {
  if (!root) return false;
  if (root.val === sum && !root.left && !root.right) {
    return true;
  }
  sum -= root.val;
  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
}

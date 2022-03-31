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

/**
 * 合并二叉树
 * @param t1 TreeNode类
 * @param t2 TreeNode类
 * @return TreeNode类
 */
function mergeTrees(t1, t2) {
  if (t1 && t2) {
    t1.val += t2.val;
    t1.left = mergeTrees(t1.left, t2.right);
    t1.right = mergeTrees(t1.right, t2.right);
  }

  return t1 || t2;
}

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param pRoot TreeNode类
 * @return TreeNode类
 */
function Mirror(pRoot) {
  if (!pRoot) {
    return null;
  }
  pRoot.mid = pRoot.left;
  pRoot.left = pRoot.right;
  pRoot.right = pRoot.mid;

  Mirror(pRoot.left);
  Mirror(pRoot.right);
  return pRoot;
}

/**
 * 二叉树的先中后序遍历
 * @param root TreeNode类 the root of binary tree
 * @return int整型二维数组
 */
function threeOrders(root) {
  let res = [],
    res1 = [],
    res2 = [],
    res3 = [];
  function fun1(root) {
    if (!root) {
      return;
    } else {
      res1.push(root.val);
      fun1(root.left);
      fun1(root.right);
    }
  }
  function fun2(root) {
    if (!root) {
      return;
    } else {
      fun2(root.left);
      res2.push(root.val);
      fun2(root.right);
    }
  }
  function fun3(root) {
    if (!root) {
      return;
    } else {
      fun3(root.left);
      fun3(root.right);
      res3.push(root.val);
    }
  }
  fun1(root);
  fun2(root);
  fun3(root);
  res.push(res1);
  res.push(res2);
  res.push(res3);
  return res;
}

/**
 * 求二叉树的层序遍历
 * @param root TreeNode类
 * @return int整型二维数组
 */
function levelOrder(root) {
  if (!root) return;
  let q = [];
  let res = [];
  q.push(root);
  while (q.length) {
    let n = q.length;
    let row = [];
    for (let i = 0; i < n; i++) {
      let cur = q.pop();
      row.push(cur.val);
      if (cur.left) {
        q.unshift(cur.left);
      }
      if (cur.right) {
        q.unshift(cur.right);
      }
    }
    res.push(row);
  }
  return res;
}

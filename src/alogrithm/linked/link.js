class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 给出单链表的头结点，反转链表
 * 最简单方法：把链表存储一遍，然后再遍历取出即可
 * @param {ListNode} head
 */
function reverseList(head) {
  let arr = [];
  while (head != null) {
    arr.push(head);
    head = head.next;
  }
  let newHead = arr[arr.length - 1];
  let temp = newHead;
  for (let i = arr.length - 2; i >= 0; i--) {
    temp.next = arr[i];
    console.log(arr[i]);
    temp = temp.next;
  }
  temp.next = null;
}

/**
 * 迭代方法：在遍历链表时，将当前节点的 next\textit{next}next
 * 指针改为指向前一个节点。
 * 由于节点没有引用其前一个节点，因此必须事先存储其前一个节点。
 * 在更改引用之前，还需要存储后一个节点。最后返回新的头引用。
 * @param{ListNode} head
 * */
function reverseList2(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next; // 1、获取下一个节点，用于下一个遍历
    curr.next = prev; // 3、独立当前节点，并让其指向已反转的最前面
    prev = curr; // 4、更新已反转的节点

    curr = next; // 2、下一个遍历
  }
}

/**
 *
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
 * 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 *
 * 这里用到了三个指针,prev,next,cur
 * 其中prev始终指向左侧的节点，cur是需要反转的节点，next是需要反转的节点的下一个
 * 每次遍历到需要反转的节点，把它的下一个插入最前面去
 *
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  const newLink = new ListNode(-1);
  newLink.next = head;
  let prev = newLink;
  for (let i = 0; i < left - 1; i++) {
    prev = prev.next;
  }

  let cur = prev.next;
  for (let i = 0; i < right - left; i++) {
    const next = cur.next;
    cur.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  return newLink.next;
};

/**
 * 合并两个升序链表，为一个新的升序链表
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const newlink = new ListNode(-1);
  let tempLink = newlink;

  if (list1 == null) {
    return list2;
  }
  if (list2 == null) {
    return list1;
  }

  while (list1 !== null && list2 !== null) {
    if (list1.val >= list2.val) {
      tempLink.next = list2;
      list2 = list2.next;
    } else {
      tempLink.next = list1;
      list1 = list1.next;
    }
    tempLink = tempLink.next;
  }

  if (list1) {
    tempLink.next = list1;
  } else {
    tempLink.next = list2;
  }
  return newlink.next;
};

/**
 * 删除排序链表中的重复元素，保留一个即可
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const newLink = new ListNode(-1);
  let tempLink = newLink;
  let headCopy = head;
  const obj = {};

  while (headCopy != null) {
    if (!obj[headCopy.val]) {
      obj[headCopy.val] = true;
      tempLink.next = headCopy;
      tempLink = tempLink.next;
    }

    headCopy = headCopy.next;
  }

  if (tempLink.next) tempLink.next = null;
  return newLink.next;
};

/**
 * 只剩下不重复的元素
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates2 = function (head) {
  if (!head) {
    return head;
  }
  const dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next && cur.next.next) {
    // 以开始为空，后面两个是链表最开始的两个就好理解了
    if (cur.next.val === cur.next.next.val) {
      // 要递归到不同值的地方
      const x = cur.next.val;
      // 这里就要开始遍历，遍历直到一个节点的值不为x
      while (cur.next && cur.next.val == x) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};

/**
 *划分链表
 * @param head ListNode类
 * @param x int整型
 * @return ListNode类
 */
function partition(head, x) {
  let lower = new ListNode(0);
  let higher = new ListNode(0);
  let low = lower;
  let hig = higher;
  while (head) {
    if (head.val < x) {
      low.next = head;
      low = low.next;
    } else {
      hig.next = head;
      hig = hig.next;
    }
    head = head.next;
  }
  low.next = higher.next;
  hig.next = null;
  return lower.next;
}

/**
 * 判断链表是否有环
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (head == null || head.next == null) {
    return false;
  }

  let fast = head.next;
  let slow = head;
  while (slow !== fast) {
    if (fast == null || fast.next == null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
};

/***
 * 判断链表是否有环,并返回环的第一个节点
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle2 = function (head) {
  if (head == null) {
    return head;
  }

  let fast = head;
  let slow = head;
  while (fast != null) {
    slow = slow.next;
    if (fast.next != null) {
      fast = fast.next.next;
    } else {
      return null;
    }
    if (fast == slow) {
      let ptr = head;
      while (ptr != slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }
  return null;
};

/**
 * 重排列表
 *  1、先通过快慢指针得到链表的中点
 *  2、反转后半段链表
 *  3、合并前半段和后半段链表
 * @param head ListNode类
 * @return void
 */
function reorderList1(head) {
  if (!head || !head.next || !head.next.next) {
    return head;
  }

  let slow = head;
  let fast = head;

  while (fast && fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  let res = reverse(slow.next);
  let ans = head,
    p1 = ans,
    p2 = res;
  while (ans && res) {
    p1 = ans.next;
    p2 = res.next;
    ans.next = res;
    res.next = p1;
    ans = p1;
    res = p2;
  }
  return head;
}

function reverse(head) {
  let cur = null;
  let pre = null;
  while (head) {
    cur = head.next;
    head.next = pre;
    pre = head;
    head = cur;
  }
  return pre;
}

function reorderList2(head) {
  if (!head || !head.next || !head.next.next) {
    return head;
  }
  let arr = [];
  while (head) {
    arr.push(head);
    head = head.next;
  }
  let i = 0,
    j = arr.length - 1;
  while (i < j) {
    arr[i].next = arr[j];
    i++;
    if (i == j) break;
    arr[j].next = arr[i];
    j--;
  }
  arr[i].next = null;
  return arr[0];
}

/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 链表中的节点每k个一组翻转
 * @param head ListNode类
 * @param k int整型
 * @return ListNode类
 */
function reverseKGroup(head, k) {
  //局部翻转 pre指向头，尾指向next
  let preHead = new ListNode(-1);
  preHead.next = head;
  let pre = preHead;
  while (head) {
    //每一轮为一组 尾结点移动
    let tail = pre;
    for (let i = 0; i < k; i++) {
      //如果凑不够k个，结束
      tail = tail.next;
      if (!tail) return preHead.next;
    }
    let next = tail.next;
    //翻转 head 到 tail，返回翻转后的头尾
    [head, tail] = reverse(head, tail);
    //拼接
    pre.next = head;
    tail.next = next;
    //更新
    pre = tail;
    head = tail.next;
  }
  return preHead.next;
}

// 高级用法
function reverse(head, tail) {
  //局部翻转列表：遍历head~tail的节点，每个节点指向前一个结点
  let pre = null;
  let current = head;
  while (pre !== tail) {
    [current.next, pre, current] = [pre, current, current.next];
  }

  return [tail, head];
}

/**
 * 删除链表的倒数第n个节点
 * @param {ListNode} head
 */
function removeNthFromEnd(head, n) {
  let slow = head;
  let quick = head;
  for (let i = 0; i < n; i++) {
    quick = quick.next;
  }

  if (!quick) {
    return head.next;
  }

  while (quick.next) {
    quick = quick.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
}

/**
 *
 * 两个链表的第一个公共结点
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindFirstCommonNode(pHead1, pHead2) {
  // write code here
  let p1 = pHead1,
    p2 = pHead2;

  while (p1 !== p2) {
    p1 = p1 ? p1.next : pHead2;
    p2 = p2 ? p2.next : pHead1;
  }
  return p1;
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
 * NC69 链表中倒数最后k个结点
 * @param pHead ListNode类
 * @param k int整型
 * @return ListNode类
 */
function FindKthToTail(pHead, k) {
  let fast = pHead;
  let slow = pHead;

  // 1、先走k步
  while (k && fast) {
    fast = fast.next;
    k--;
  }
  if (k != 0) {
    return {};
  }

  // 2、剩下的一起走
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}

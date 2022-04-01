/**
 * 需求介绍：
 * 打印的数据内容如下：
 let arr = [
	{id: 1, name: '部门1', pid: 0},
	{id: 2, name: '部门2', pid: 1},
	{id: 3, name: '部门3', pid: 1},
	{id: 4, name: '部门4', pid: 3},
	{id: 5, name: '部门5', pid: 4},
]

 输出结果
 [
	{
		"id": 1,
		"name": "部门1",
		"pid": 0,
		"children": [
			{
				"id": 2,
				"name": "部门2",
				"pid": 1,
				"children": []
			},
			{
				"id": 3,
				"name": "部门3",
				"pid": 1,
				"children": [
					// 结果 ,,,
				]
			}
		]
	}
]
 *
 *
 * */

let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

// 1。递归查找
// 最开始传入的Pid为0
// 1。 找到pid为0的节点，即子节点
// 2. 找到后把它推入结果数组，并且以当前节点的id为父节点，去递归查找其子节点

const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
};

const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, [], pid);
  return result;
};

arrayToTree(arr, 0);

// 2.map操作
/*
这个方法有点意思，主要用到的就是地址的引用，可能有点复杂，但真了解后会对今后开发非常有用
先把节点改成如下形式
{
	1:[]
	2:[]
	3:[]
	4:[]
	5:[]
}

然后先把1的节点放到result中，即如下形式
[
1:[]
]


之后遍历，最后map结果如下
{
	1:[2,3]
	2:[]
	3:[4],
	4:[5],
	5:[]
}
注意，这里是地址的引用，相当于我可以只在1中获取到5的节点
{
	1:[0x02,0x03]   0x01
	2:[]   0x02
	3:[0x04]   0x03
	4:[0x05]   0x04
	5:[]   0x05
}
然后result:[0x01]
[
	1:[
		2:[],
		3:[
			4:[
				5:[]
			]
		]
	]
]
 */
function arrayToTreeMap(items) {
  const result = [];
  const itemMap = {};

  // 先转成map存储
  for (const item of itemMap) {
    itemMap[item.id] = { ...item, children: [] };
  }

  for (const item of items) {
    const id = item.id;
    const pid = item.pid;
    const node = itemMap[id];
    if (pid == 0) {
      result.push(node);
    } else {
      // 其父节点不在map中
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }

      itemMap[pid].children.push(node);
    }
  }

  return result;
}

function arrayToTreeMap2(items) {
  const result = [];
  const itemMap = {};
  // 一次遍历解决问题
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    // 当前的节点没有，直接创建一个
    if (!itemMap[id]) {
      itemMap[i] = {
        children: [],
      };
    }

    // 给当前节点赋值
    itemMap[id] = {
      ...item,
      // 这个是为了防止在其他地方定义过，把原来的children拿来
      children: itemMap[id]["children"],
    };

    // 获取当前节点
    const node = itemMap[id];

    if (pid === 0) {
      result.push(node);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(node);
    }
  }
  return result;
}

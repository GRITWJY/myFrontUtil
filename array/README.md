# JS中数组相关技巧
这里有部分是一行代码就解决的，我就不放在文件里了，直接在README.md页面展示

较复杂的会有js文件

详细内容可看[我的博客](http://121.8.100.75:10001)

## 过滤控制 `arr.filter(Boolean)`
## 数组去重 `[...new Set(arr)]`
## 数组取差集 `arr1.filter(item => !arr2.includes(item))`
## 反转字符串 `str.split("").reverse().join("")`
## 回文串  `str.split("").reverse().join("") === str`


- [扁平数据转tree](arrayToTree.js)
- [数组扁平化](flatern.js)
- [数组原型对象上的一些方法:map,reduce,filter,some,find,concat,](arrayProto.js)
- [数组分块](chunk.js)
- [删除数组中部分元素](pull.js)

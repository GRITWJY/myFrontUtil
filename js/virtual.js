// 暴力解法
function violence() {
  let now = Date.now();
  const total = 100000;
  let ul = document.querySelector("#container");
  for (let i = 0; i < total; i++) {
    let li = document.createElement("li");
    li.innerText = ~~(Math.random() * total);
    ul.appendChild(li);
  }
  console.log("JS运行时间", Date.now() - now);
  setTimeout(() => {
    console.log("总运行时间", Date.now() - now);
  }, 0);
  // JS运行时间 232
  // 总运行时间 5125
}

// 使用定时器
// 调用时可以把所有数据和逻辑处理函数传过去
function timeSliceSet(response, cb) {
  let once = 20; // 一次渲染多少条
  let index = 0; // 开始的索引
  let total = response.data.length; // 数据的总数
  let _this = this;

  function loop(curTotal, curIndex) {
    if (curTotal <= 0) {
      // 数据全部完成进行的操作
      return;
    }
    // 此次循环需要多少条数据，最后一次可能不满足once
    let pageCount = Math.min(curTotal, once);
    setTimeout(() => {
      for (let i = 0; i < pageCount; i++) {
        // 获取到当前数据
        let data = response.data[i + curIndex];
        // 处理循环逻辑
        cb(data);
      }

      // 每次循环完成后，总数减去此次处理的条数， 索引加上当前处理的记录数
      loop(curTotal - pageCount, curIndex + pageCount);
    }, 0);
  }

  loop(total, index);
}

// 使用window.requestAnimationFrame
function timeSlice2(response, cb) {
  let once = 20;
  let index = 0;
  let total = response.data.length;
  let _this = this;

  function loop(curTotal, curIndex) {
    if (curTotal <= 0) {
      // 数据全部完成进行的操作
      return;
    }
    let pageCount = Math.min(curTotal, once);
    window.requestAnimationFrame(() => {
      for (let i = 0; i < pageCount; i++) {
        let data = response.data[i + curIndex];
        // 处理循环逻辑
        cb(data);
      }
      loop(curTotal - pageCount, curIndex + pageCount);
    }, 0);
  }

  loop(total, index);
}

// 使用DocumentFragment

<ul id="container"></ul>;

function timeSlice3() {
  //需要插入的容器
  let ul = document.getElementById("container");
  // 插入十万条数据
  let total = 100000;
  // 一次插入 20 条
  let once = 20;
  //总页数
  let page = total / once;
  //每条记录的索引
  let index = 0;

  //循环加载数据
  function loop(curTotal, curIndex) {
    if (curTotal <= 0) {
      return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal, once);
    window.requestAnimationFrame(function () {
      let fragment = document.createDocumentFragment();
      for (let i = 0; i < pageCount; i++) {
        let li = document.createElement("li");
        li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      loop(curTotal - pageCount, curIndex + pageCount);
    });
  }

  loop(total, index);
}

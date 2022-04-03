function test1(n, r, b, a) {
  let extra = 0; // 需要额外增加的
  let sum = 0;

  for (let i = 1; i < n; i++) {
    if (a[i] === a[i - 1]) {
      if (a[i] == "r") {
        b--;
        sum++;
      } else {
        r--;
        sum++;
      }
    }
  }

  if (a < 0 || b < 0) {
    console.log(`${Math.abs(a)} ${Math.abs(b)}`);
  } else {
    console.log(sum + n);
  }
}

function test2(n, arr) {
  let mid = Math.floor((n - 1) / 2);
  console.log(mid);
  let sum = 0;

  for (let i = 1; i <= mid; i++) {
    if (arr[i - 1] >= arr[i]) {
      sum += arr[i - 1] - arr[i] + 1;
      arr[i] = arr[i - 1] + 1;
    }
    if (arr[n - i] >= arr[n - 1 - i]) {
      sum += arr[n - i] - arr[n - 1 - i] + 1;
      arr[n - 1 - i] = arr[n - i] + 1;
    }

    console.log(arr);
  }

  console.log(sum);
}

function test3(s, t) {
  let step = t.length;

  let len = s.length;

  // 步长
  for (let i = step; i <= len; i++) {
    for (let j = 0; j + i - 1 < len; j++) {
      // 获得子串
      let str = s.slice(j, j + i);
      let res = [];
      for (let k = 0; k < t.length; k++) {
        let reg = new RegExp(t[k]);
        let arr = str.match(reg);
        console.log(arr);
      }
    }
  }
}

// test3("acac", "ac");

function test4(str) {
  let sum = 0;
  if (str.length >= 10) {
    console.log(0);
    return;
  }
  let flag = 1;
  for (let j = 0; j < str.length; j++) {
    if (str[j] == "_" || !isNaN(parseInt(str[j]))) {
      flag = 0;
      break;
    }
  }
  console.log(flag);
}

// test4("hfahfoaf()U8f9b8f9ashffhbaffwa");

// console.log(isNaN(parseInt("9")));

// console.log(["a", "b", "c", "d"].includes("a"));

let n = parseInt(read_line());

let sum = 0;
for (let i = 0; i < n; i++) {
  let str = read_line();
  if (str.length > 10) {
    continue;
  }

  let flag = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "_" && !isNaN(parseInt(str[i]))) {
      flag = 0;
      break;
    }
  }

  sum += flag;
}

console.log(sum);

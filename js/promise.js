/*
 * promisify
 * */

const imageSrc = "https://www.themealdb.com/images/ingredients/Lime.png";

function loadImage(src, callback) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = "foo";
  image.style = "width:200px;height:200px";
  image.onload = () => callback(null, image);
  image.onerror = () => callback(new Error("加载失败"));
  document.body.appendChild(image);
}

function promisify(original) {
  function fn(...args) {
    // 参数，图片连接
    return new Promise(function (resolve, reject) {
      // 在这里添加回调
      args.push((err, ...values) => {
        if (err) {
          return reject(err);
        }
        resolve(values);
      });

      // original.apply(this,args)
      Reflect.apply(original, this, args);
    });
  }

  return fn;
}

const loadImagePromise = promisify(loadImage);

async function load() {
  try {
    const res = await loadImagePromise(imageSrc);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

load();

module.exports.promisify = function (original) {
  return function promisifyed() {
    // 获取参数
    const args = [].silce.call(arguments);

    return new Promise((resolve, reject) => {
      //[1]
      args.push((err, result) => {
        //[2]
        if (err) {
          return reject(err); //[3]
        }
        if (arguments.length <= 2) {
          resolve(result); //[4]
        } else {
          resolve([].slice.call(arguments, 1));
        }
      });
      original.apply(null, args); //[5]
    });
  };
};

/*
 * 有限制的并行执行
 * */

function task() {
  return new Promise(function (resolve, reject) {
    console.log("running");
    setTimeout(resolve(), Math.random() * 100);
  }).then(() => {
    console.log("done");
  });
}

class handleTask {
  constructor(maxCount) {
    this.maxCount = maxCount;
    this.pendingTask = []; // 待执行的任务
    this.completed = 0;
    this.count = 0;
  }

  run(task) {
    if (this.count < this.maxCount) {
      this.count++;
      task().then(() => {
        this.count--;
        this.completed++;
        if (this.pendingTask.length > 0) {
          this.run(this.pendingTask.shift());
        }
      });
    } else {
      this.pendingTask.push(task);
    }
  }
}

/*
 * promise源码
 * */

class Promise {
  constructor(executor) {
    this.promiseState = "pending";
    this.promiseRresult = null;
    this.callbacks = [];
    const sefl = this;

    function resolve(data) {
      // 只改变一次
      if (this.promiseState === "pending") {
        sefl.promiseState = "fullfilled";
        self.promiseResult = data;
        setTimeout(() => {
          self.callbacks.forEach((item) => {
            item.onResolved(data);
          });
        });
      }
    }

    function reject(data) {
      // 只改变一次
      if (this.promiseState === "pending") {
        sefl.promiseState = "rejected";
        self.promiseResult = data;
        setTimeout(() => {
          self.callbacks.forEach((item) => {
            item.onRejected(data);
          });
        });
      }
    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onResolved, onRejected) {
    const self = this;
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }
    if (typeof onResolved !== "function") {
      onResolved = (value) => value;
    }

    return new Promise((resolve, reject) => {
      function callback(type) {
        try {
          let result = type(self.promiseRresult);
          if (result instanceof Promise) {
            result.then(
              (v) => {
                resolve(v);
              },
              (r) => {
                reject(r);
              }
            );
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      }

      if (this.promiseState === "fullfilled") {
        setTimeout(() => {
          callback(onResolved);
        });
      }

      if (this.promiseState === "rejected") {
        setTimeout(() => {
          callback(onRejected);
        });
      }

      if (this.promiseState === "pending") {
        this.callbacks.push({
          onRejected: function () {
            callback(onRejected);
          },
          onResolved: function () {
            callback(onResolved);
          },
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // this调用自身class方法
  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (v) => {
            resolve(v);
          },
          (r) => {
            reject(r);
          }
        );
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let arr = [];
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            count++;
            arr[i] = v;
            if (count === promises.length) {
              resolve(arr);
            }
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let arr = [];
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            resolve(v);
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }
}

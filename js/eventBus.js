export const eventBus = {
  // 保存事件与回调
  callbacks: {},
};
// 绑定事件
eventBus.on = function (type, callback) {
  // 判断
  if (this.callbacks[type]) {
    this.callbacks[type].push(callback);
  } else {
    // 如果callbacks属性中不存在该类型
    this.callbacks[type] = [callback];
  }
};

eventBus.emit = function (type, data) {
  if (this.callbacks[type] && this.callbacks[type].length > 0) {
    // 遍历数组
    this.callbacks[type].forEach((callback) => {
      callback(data);
    });
  }
};

eventBus.off = function (eventName) {
  if (eventName) {
    delete this.callbacks[eventName];
  } else {
    this.callbacks = {};
  }
};

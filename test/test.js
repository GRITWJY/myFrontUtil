class Promise {}

export function call(fn, obj, ...args) {}

export function apply(fn, obj, args) {}

export function throttle(callback, wait) {}

export function debounce(callback, time) {}

export default function bind(fn, obj, ...args) {}

export default function map(arr, callback) {}

export default function reduce(arr, callback, initValue) {}

export default function filter(arr, callback) {}

export default function find(arr, callback) {}
export default function findIndex(arr, callback) {}

export default function every(arr, callback) {}

export default function some(arr, callback) {}

// 第一种，forEach+indexOf
export default function unique(arr) {}

// 第二种，forEach+Obj
export default function unique2(arr) {}

// 第三种，set
export default function unique3(arr) {}

export default function concat(arr, ...args) {}


export default function slice(arr, begin, end) {}


export default function flatten1(arr) {}

export default function flatten1(arr) {}

export default function chunk(arr, size) {}

export default function difference(arr1, arr2) {}

export default function pull(arr, ...args) {}


export default function drop(arr, size) {}

// 对象
export default function newInstance(Fn, ...args) {}

export default function myInstanceOf(obj, Fn) {}

export default function mergeObject(...objs) {}

export default function clone1(target) {}

export default function clone2(target) {}

export default function deepClone1(obj) {}

// 递归遍历
export default function deepClone2(target) {}

export default function deepClone3(target, map = new Map()) {}

export const eventBus = {}
eventBus.on = function (type, callback) {}

eventBus.emit = function (type, data) {}

eventBus.off = function (eventName) {}


export const Pubsub = {}
Pubsub.subscribe = function (channel, callback) {}

Pubsub.publish = function (channel, data) {}

Pubsub.unsubscribe = function (flag) {}

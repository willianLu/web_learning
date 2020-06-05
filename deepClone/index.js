// 所有数据类型
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]; // 可迭代类型

// 引用类型，非原始类型
function isObject(target) {
  const type = typeof target;
  return type !== null && (type === "object" || type === "function");
}

// 获取数据类型
function getType(target) {
  return Object.prototype.toString.call(target);
}

// 初始化引用类型的初始值
function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

// 克隆函数
function clone(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target;
  }
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    // 其他类型的拷贝
    return;
  }
  // 防止循环引用

  // map 类型的拷贝

}

/**
 * 工具方法
 * 数据类型判断等
 */
function isObject(target) {
    return Object.prototype.toString.call(target) === "[object Object]";
  }
  
  function isArray(target) {
    return Object.prototype.toString.call(target) === "[object Array]";
  }
  
  const person = {
    name: "lu",
    say() {
      console.log("我的名字是-", this.name);
    },
  };
  // person.say();
  
  // 浅拷贝
  const liu = Object.assign(person);
  // console.log(liu === person); // true
  
  /**
   * 乞丐版深拷贝方法
   * 缺陷：无法拷贝引用类型、函数、循环引用等
   */
  
  const li = JSON.parse(JSON.stringify(person));
  // console.log(li); // { name: "lu" } 无 say 属性
  
  // 拷贝的对象
  const obj = {
    key1: 1,
    key2: undefined,
    key3: true,
    key4: "key4",
    key5: {
      obj: {
        arr: [1, 2, 3],
      },
    },
    key6: [{ a: "123", b: [1, 2, 3] }],
  };
  
  // 简单数据深拷贝，只考虑object和arrary及基本类型
  function simpleDeepClone(target) {
    if (isObject(target) || isArray(target)) {
      const cloneTarget = isObject(target) ? {} : [];
      for (let key in target) {
        cloneTarget[key] = simpleDeepClone(target[key]);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  // 简单数据基本拷贝
  // const _obj = simpleDeepClone(obj);
  // console.log(_obj === obj); // false
  
  // 改进简单深拷贝，解决循环引用问题
  function _simpleDeepClone(target, map = new WeakMap()) {
    if (isObject(target) || isArray(target)) {
      if (map.get(target)) {
        return map.get(target);
      }
      const cloneTarget = isObject(target) ? {} : [];
      map.set(target, cloneTarget);
      for (let key in target) {
        cloneTarget[key] = _simpleDeepClone(target[key], map);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  // 循环引用-简单数据基本拷贝
  // obj.target = obj;
  // const _obj2 = _simpleDeepClone(obj);
  // console.log(_obj2 === obj); // false
  
  // 修改遍历方式
  function forEach(target, fn) {
    let index = -1;
    const len = target.length;
    while (++index < len) {
      fn(target[index], index);
    }
  }
  
  function _deepClone(target, map = new WeakMap()) {
    let isObj = isObject(target);
    if (isObj || isArray(target)) {
      if (map.get(target)) {
        return map.get(target);
      }
      const cloneTarget = isObj ? {} : [];
      map.set(target, cloneTarget);
      forEach(isObj ? Object.keys(target) : target, (value, key) => {
        if (isObj) key = value;
        cloneTarget[key] = _deepClone(target[key], map);
      });
      return cloneTarget;
    } else {
      return target;
    }
  }
  
  // 性能优化
  // console.time();
  // const _obj3 = _simpleDeepClone(obj);
  // console.timeEnd();
  
  // console.time();
  // const _obj4 = _deepClone(obj);
  // console.timeEnd();
  
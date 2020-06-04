class Observe {
  constructor(vm, data) {
    this.vm = vm;
    this.data = data;
    this.initData();
  }
  initData() {
    const keys = Object.keys(this.data);
    let i = keys.length;
    while (i--) {
      this.proxy(keys[i]);
    }
    this.observe(this.data);
  }
  proxy(key) {
    Object.defineProperty(this.vm, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        return this.data[key];
      },
      set: (val) => {
        console.log("set--->", val);
        this.data[key] = val;
      },
    });
  }
  observe(data) {
    if (data && typeof data === "object") {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(data, key, value) {
    this.observe(value);
    const dep = new Dep();
    Object.defineProperty(data, key, {
      get: () => {
        if (Dep.target) {
          Dep.target.addDep(dep);
        }
        return value;
      },
      set: (newVal) => {
        console.log("defineReactive--->", newVal, "---->", newVal === value);
        if (newVal === value) return;
        value = newVal;
        this.observe(newVal);
        dep.notify();
      },
    });
  }
}

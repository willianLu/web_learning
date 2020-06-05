class EventBus {
  constructor() {
    this.bus = {};
  }
  on(key, cb) {
    // cb 必须为function函数，这里不作判断
    if (!(key in this.bus)) {
      this.bus[key] = [cb];
    } else {
      this.bus[key].push(cb);
    }
    return this;
  }
  emit(key, ...data) {
    if (key in this.bus) {
      this.bus[key].forEach((cb) => {
        cb && cb(...data);
      });
    }
    return this;
  }
  off(key, cb) {
    if (key in this.bus) {
      this.bus[key] = this.bus[key].filter((item) => item !== cb);
    }
    return this;
  }
  once(key, cb) {
    const _cb = (...args) => {
      cb(...args);
      this.off(key, _cb);
    };
    this.on(key, _cb);
    return this;
  }
}

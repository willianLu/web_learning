class Watcher {
  constructor(vm, render) {
    this.vm = vm;
    this.render = render;
    this.ids = [];
    this.compile();
  }
  compile() {
    Dep.target = this;
    this.update();
    Dep.target = null;
  }
  addDep(dep) {
    const id = dep.id;
    if (this.ids.indexOf(id) === -1) {
      this.ids.push(id);
      dep.addSub(this);
    }
  }
  update() {
    this.render.call(this.vm);
  }
}

class Vue {
  constructor(options) {
    options.data = options.data();
    this.$options = options;
    this.$data = options.data;
    new Observe(this, this.$data);
    this.mount(document.querySelector(this.$options.el));
  }
  mount(el) {
    this.$el = el;
    new Watcher(this, () => {
      this.update(this.render());
    });
  }
  update(vnode) {
    console.log("------->update");
    var preVnode = this._vnode;
    this._vnode = vnode;
    patch(preVnode ? preVnode : this.$el, vnode);
  }
  render() {
    return this.$options.render.call(this);
  }
}

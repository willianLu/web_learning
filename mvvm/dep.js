let uid$1 = 0;
class Dep {
  constructor() {
    this.subs = [];
    this.id = uid$1++;
  }
  target = null;
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

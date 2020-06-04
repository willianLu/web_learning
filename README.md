## web 学习文档记录
### mvvm基本原理学习 -> 实现简易vue
+ observe 观察数据，利用Object.defineProperty实现数据的双向绑定，及依赖搜集
+ dep 依赖收集，数据变化通知
+ watcher 观察者，订阅数据变化通知，执行更新
+ compile 执行编译
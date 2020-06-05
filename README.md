## web 学习文档记录
### mvvm基本原理学习 -> 实现简易vue
+ observe 观察数据，利用Object.defineProperty实现数据的双向绑定，及依赖搜集
+ dep 依赖收集，数据变化通知
+ watcher 观察者，订阅数据变化通知，执行更新
+ compile 执行编译
---
### eventBus简单实现事件触发与事件监听器功能的封装
+ emit 事件触发
+ on 事件监听
+ once 只监听事件一次
+ off 解除事件监听
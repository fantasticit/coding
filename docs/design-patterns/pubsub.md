---
title: "发布订阅模式"
index: 3
---

## 发布订阅模式

事件发布订阅模式可以帮助完成更松的解耦。

## EventEmiiter 的简单实现

```javascript
class EventEmitter {
  constructor() {
    this.listener = new Map();
  }

  on(type, fn) {
    const subs = this.listener.get(type);

    if (!subs) {
      this.listener.set(type, [fn]);
    } else {
      this.listener.set(type, [].concat(subs, fn));
    }
  }

  emit(...args) {
    const type = args[0];

    for (let listener of this.listener.get(type)) {
      listener(...args.slice(1));
    }
  }
}
```

测试代码：

```javascript
const em = new EventEmitter();
em.on("click", (counter) => {
  assert.equal(counter, 1);
});
em.emit("click", 1);
```

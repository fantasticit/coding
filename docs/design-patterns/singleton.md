---
title: "单例模式"
index: 1
---

## 单例模式

单例模式需确保只有一个实例且可以全局访问。

## 实现单例模式

```javascript
let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  };
})();

class Singleton {
  constructor(name) {
    this.name = name;

    if (!__instance()) {
      __instance(this);
    }

    return __instance();
  }
}
```

测试：

```javascript
const s1 = new Singleton("s1");
const s2 = new Singleton("s2");

assert.strictEqual(s1, s2);
assert.strictEqual(s1.name, s2.name);
```

## 实践

单例模式需要满足只有一个实例且可全局访问即可，可以使用 JavaScript 的闭包来实现。接下来以弹窗为例：

```javascript
function createPopup(content) {
  const div = document.createElement("div");
  div.innerHTML = content;
  return div;
}
```

将单例模式和创建弹窗代码解耦：

```javascript
function createSingleton(fn) {
  let result;
  return function () {
    return (result || result = fn.apply(this, arguments));
  };
}

const createSingletonPopup = createSingleton(createPopup);
```

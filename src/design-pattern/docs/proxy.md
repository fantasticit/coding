# 代理模式

代理对象和本体对象具有一致的接口，对使用者友好。代理模式的种类有很多种，在 `JavaScript` 中常见的是：虚拟代理和缓存代理。

## 虚拟代理实现图片预加载

```javascript
const myImg = (() => {
  const img = document.appendChild('img')
  document.body.appendChild(img)

  return {
    setSrc: src => (img.src = src)
  }
})()

const proxyImage = (() => {
  const img = new Image()
  img.onload = function() {
    myImg.setSrc(this.src)
  }

  return {
    setSrc: src => {
      myImg.setSrc('loading.png')
      img.src = src
    }
  }
})()

proxyImage.setSrc('loaded.jpg')
```

## 缓存代理实现乘积计算

```javascript
const multiply = function(...args) {
  return args.reduce((accu, curr) => (accu *= curr), 1)
}

const proxyMultiply = (() => {
  const cache = {}
  return (...args) => {
    let tag = args.join(',')

    if (cache[tag]) {
      return cache[tag]
    }

    return (cache[tag] = multiply.apply(null, args))
  }
})()
```

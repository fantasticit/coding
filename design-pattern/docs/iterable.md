# 迭代器模式

能访问到聚合对象的顺序和元素。

## ES6 的 `iterator` 接口

```javascript
const data = {
  data: [1, 2, 3, 4, 5, 6],
  [Symbol.iterator]() {
    const len = this.data.length
    let index = 0

    return {
      next: () => {
        return index < len
          ? { value: this.data[index++], done: false }
          : { value: undefined, done: true }
      },
      rewind: () => (index = 0)
    }
  }
}
```

测试代码：

```javascript
```

# Stack

栈遵从 **后进先出（LIFO）** 原则。新添加的元素或待删除的元素都保存在栈的末尾，称作 **栈顶** 。在栈里，新元素都靠近栈顶，旧元素接近栈底。

## 栈的创建

可以使用数组来保存栈里的元素。

```javascript
let items = [];
```

接口设计：

- push: 向栈中添加元素
- pop: 移除栈顶的元素，并返回被移除的元素
- peek: 返回栈顶的元素
- size: 返回栈中元素数量
- isEmpty: 返回栈中元素数量是否为 0
- clear: 移除栈中所有元素

## 代码实现

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  /**
   * 添加元素到栈顶
   * @param {*} element
   */
  push(element) {
    if (Array.isArray(element)) {
      element.forEach(el => this.items.push(el));
    } else {
      this.items.push(element);
    }
  }

  /**
   * 移除栈顶的元素，同时返回被移除的元素
   */
  pop() {
    return this.items.pop();
  }

  /**
   * 返回栈顶的元素，不对栈做任何修改
   */
  peek() {
    return this.items[this.items.length - 1];
  }

  /**
   * 判断栈中是否含有元素
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * 移除栈内所有元素
   */
  clear() {
    this.items = [];
  }

  /**
   * 返回栈内元素数量
   */
  size() {
    return this.items.length;
  }
}
```

测试:

```javascript
const stack = new Stack();
stack.push([0, 1, 2, 3]);
stack.push(4);

t.equal(stack.size(), 5);
t.equal(stack.peek(), 4);

const element = stack.pop();
t.equal(element, 4);
t.equal(stack.size(), 4);

stack.clear();
t.equal(stack.size(), 0);
t.equal(stack.isEmpty(), true);
```

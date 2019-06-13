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

module.exports = Stack;

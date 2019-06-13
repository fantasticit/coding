class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  append(value) {
    return this.insert(this.length > 0 ? this.length : 0, value);
  }

  insert(position, value) {
    if (position < 0 || position > this.length) {
      return false;
    }

    let node = new Node(value);
    let previous = null;
    let current = this.head;
    let index = 0;

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      previous.next = node;
      node.next = current;
    }

    this.length++;

    return true;
  }

  removeAt(position) {
    if (position < -1 || position >= this.length) {
      return null;
    }

    let previous = null;
    let current = this.head;
    let index = 0;

    if (position === 0) {
      // 移除第一项
      this.head = current.next;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      // 将 previous 和 current 的下一项连接，跳过 current，从而移除它
      previous.next = current.next;
    }

    this.length--;

    return current.value;
  }

  indexOf(value) {
    let current = this.head;
    let i = -1;

    while (current) {
      i++;

      if (current.value === value) {
        return i;
      }

      current = current.next;
    }

    return -1;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  toString() {
    let current = this.head;
    let str = "";

    while (current) {
      str += current.value;
      current = current.next;
    }

    return str;
  }
}

module.exports = LinkList;

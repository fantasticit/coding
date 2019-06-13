const LinkList = require("./LinkList");

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkList extends LinkList {
  constructor() {
    super();
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  insert(position, value) {
    if (position < 0 || position > this.length) {
      return false;
    }

    let node = new Node(value);
    let previous = null;
    let current = this.head;
    let index = 0;

    if (position == 0) {
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        this.head.next = node;
        node.prev = this.head;
      }
    } else if (position === this.length) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      node.prev = previous;
      node.next = current;
      previous.next = node;
      current.prev = node;
    }

    this.length++;
    return true;
  }

  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return false;
    }

    let previous = null;
    let current = this.head;
    let index = 0;

    if (position === 0) {
      this.head = current.next;

      if (this.length === 1) {
        this.tail = null;
      } else {
        this.head.prev = null;
      }
    } else if (position === this.length) {
      current = this.tail;

      this.tail = current.prev;
      this.tail.next = null;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      //将previous与current的下一项链接起来——跳过current
      previous.next = current.next;
      current.next.prev = previous;
    }

    this.length--;

    return current.value;
  }
}

module.exports = DoublyLinkList;

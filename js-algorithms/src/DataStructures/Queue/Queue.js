class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    if (Array.isArray(element)) {
      element.map(el => this.items.push(el));
    } else {
      this.items.push(element);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

module.exports = Queue;

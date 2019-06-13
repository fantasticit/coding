const Queue = require("./Queue");

class PriorityQueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue extends Queue {
  enqueue(element) {
    if (Array.isArray(element)) {
      element.forEach(el => this.enqueue(el));
    } else {
      const node = new PriorityQueueElement(element.element, element.priority);

      if (this.isEmpty()) {
        this.items.push(node);
      } else {
        let added = false;

        for (let i = 0, len = this.items.length; i++; i < len) {
          if (node.priority > this.items[i].priority) {
            this.items.splice(i, 0, node);
            added = true;
            break;
          }
        }

        if (!added) {
          this.items.push(node);
        }
      }
    }
  }
}

module.exports = PriorityQueue;

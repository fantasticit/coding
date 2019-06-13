# Queue

队列遵循 **先进先出（FIFO）** 的原则。队列在尾部添加新元素，从顶部移除元素。新添加的元素一定在队列的末尾。

## 创建队列

同样可以使用数组来保存队列里的元素。

```javascript
let items = [];
```

接口设计：

- enqueue: 向队列尾部添加元素
- dequeue: 移除队列的第一个元素，并返回被移出的元素
- front: 返回队列中的第一个元素，不对队列做任何改动
- isEmpty: 返回队列中是否包含元素
- size: 返回队列中元素数量
- clear: 清空队列

### 代码实现

```javascript
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
```

测试：

```javascript
const queue = new Queue();
queue.enqueue([0, 1, 2, 3]);
queue.enqueue(4);

t.equal(queue.size(), 5);
t.equal(queue.front(), 0);

const element = queue.dequeue();
t.equal(element, 0);
t.equal(queue.size(), 4);

queue.clear();
t.equal(queue.size(), 0);
t.equal(queue.isEmpty(), true);
```

## 优先队列

**优先队列** 是在 **队列** 基础上的一个改动。元素的添加和移除是基于优先级的。实现优先队列有两种方式：设置优先级，在正确的位置插入；或者添加元素，但是按照优先级出列。

```javascript
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
```

> PS: 通过 `arr.splice(i, 0, elemnts)` 即可以在 `i` 处添加元素。

测试：

```javascript
const queue = new PriorityQueue();

queue.enqueue([
  {
    element: 10,
    priority: 10
  },

  {
    element: 0,
    priority: 9
  },

  {
    element: 2,
    priority: 4
  }
]);

t.equal(queue.dequeue().priority, 10);
t.equal(queue.front().element, 0);
t.equal(queue.front().priority, 9);
```

## 循环队列：击鼓传花

另一个修改版的队列实现，就是循环队列。循环队列的一个例子就是击鼓传花游戏(Hot Potato)。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止， 这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子(胜者)。

```javascript
function hotPotato(names, count) {
  const queue = new Queue();

  queue.enqueue(names);

  while (queue.size() > 1) {
    for (let i = 0; i < count; i++) {
      queue.enqueue(queue.dequeue());
    }

    const t = queue.dequeue();
    console.log("淘汰: ", t);
  }

  return queue.dequeue();
}

const names = ["red", "blue", "green", "yellow", "black"];
const winner = hotPotato(names, 7);
console.log("胜利者：", winner);
```

# LinkList

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中不是连续放置的。每个元素由一个存储元素本身的节点和指向下一个元素的 **引用** 组成。

```shell
------------------------------------------------------------------------
|                                                                      |
|                node                      node               null     |
|           ---------------          ---------------        --------   |
|  head ->  + item | next +    ->    + item | next +   ->   + null +   |
|           ---------------          ---------------        --------   |
|                                                                      |
------------------------------------------------------------------------
```

## 创建链表

链表需要一个 `Node` 辅助类，该类包含 一个 `value` 属性，一个 `next` 属性。

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

接口设计：

- append(node): 向链表尾部添加元素
- insert(position, node): 向指定位置添加元素
- removeAt(position): 移除指定位置的元素
- indexOf(node): 返回元素在列表只能给的索引，无该元素返回 -1
- size(): 返回链表中元素个数
- toString(): 重写继承至 JavaScript 对象的 `toString` 方法，让其只输出元素的值。

### 代码实现

```javascript
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
```

测试：

```javascript
const linkList = new LinkList();

t.plan(7);

linkList.append(0);
linkList.append(1);
linkList.append(2);
linkList.append(4);
linkList.append(5);

t.equal(linkList.size(), 5);
t.equal(linkList.indexOf(4), 3);

linkList.insert(3, 3);
t.equal(linkList.indexOf(4), 4);
t.equal(linkList.size(), 6);

linkList.removeAt(3);
t.equal(linkList.indexOf(4), 3);
t.equal(linkList.size(), 5);
t.equal(linkList.isEmpty(), false);
```

## 双向链表

在双向链表中，链接是双向的：一个链向前一个元素，另一个链向前一个元素。

```shell
--------------------------------------------------------------------------------------------
|                                                                                          |
|                       node (head)                   node (tail)                null      |
|  --------        ----------------------         ---------------------        --------    |
|  + null +   <-  + prev | item | next +    <->   + prev | item | next +  ->   + null +    |
|  --------        -----------------------        ---------------------        --------    |
|                                                                                          |
--------------------------------------------------------------------------------------------
```

### 代码实现

```javascript
const LinkList = require("./index");

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
```

测试：

```javascript
const linkList = new DoublyLinkList();

t.plan(7);

linkList.append(0);
linkList.append(1);
linkList.append(2);
linkList.append(4);
linkList.append(5);

t.equal(linkList.size(), 5);
t.equal(linkList.indexOf(4), 3);

linkList.insert(3, 3);
t.equal(linkList.indexOf(4), 4);
t.equal(linkList.size(), 6);

linkList.removeAt(3);
t.equal(linkList.indexOf(4), 3);
t.equal(linkList.size(), 5);
t.equal(linkList.isEmpty(), false);
```

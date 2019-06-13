# Set

集合 是由一组无序且唯一的项构成的。

## 集合的创建

可以使用对象来保存集合里的元素。

```javascript
let items = {};
```

接口设计：

- add(value): 向集合添加一个新的项
- remove(value): 从集合移除一项
- has(value): 判断值是否在集合中
- clear(): 移除集合中所有元素
- size(): 返回集合中元素数量
- values(): 返回一个包含集合中所有值的数组

## 集合操作

- 并集：对于给定两集合，返回一个包含两个集合中所有元素的新集合
- 交集：对于给定两集合，返回一个包含两集合共有元素的新集合
- 差集：对于给定两集合，返回一个包含所有存在于第一个集合但不存在于第二个集合的元素的新集合
- 子集：验证给定集合是否是另一个集合的子集

## 代码实现

```javascript
class Set {
  constructor() {
    this.items = Object.create(null);
  }

  has(value) {
    return value in this.items;
  }

  add(value) {
    if (this.has(value)) {
      return false;
    } else {
      this.items[value] = value;
      return true;
    }
  }

  delete(value) {
    if (this.has(value)) {
      delete this.items[value];
      return true;
    } else {
      return false;
    }
  }

  clear() {
    this.items = Object.create(null);
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.keys(this.items);
  }

  // 集合操作
  union(anotherSet) {
    const newSet = new this.constructor();

    this.values().map(value => newSet.add(value));
    anotherSet.values().map(value => newSet.add(value));
    return newSet;
  }

  intersection(anotherSet) {
    const newSet = new this.constructor();
    this.values()
      .filter(value => anotherSet.has(value))
      .map(value => newSet.add(value));
    return newSet;
  }

  difference(anotherSet) {
    const newSet = new this.constructor();
    this.values()
      .filter(value => !anotherSet.has(value))
      .map(value => newSet.add(value));
    return newSet;
  }

  subset(anotherSet) {
    if (this.size() > anotherSet.size()) {
      return false;
    } else {
      return this.values().every(value => anotherSet.has(value));
    }
  }
}
```

测试：

```javascript
test("Set", t => {
  const set = new Set();
  set.add(1);
  set.add(2);

  t.plan(3);
  t.equal(set.has(1), true);
  t.equal(set.has(3), false);

  set.delete(1);
  t.equal(set.has(1), false);
});

test("Set union", t => {
  const s1 = new Set();
  s1.add(0);
  s1.add(1);

  const s2 = new Set();
  s2.add(1);
  s2.add(2);

  const s = s1.union(s2);

  t.plan(1);
  t.looseEqual(s.values(), ["0", "1", "2"]);
});

test("Set intersection", t => {
  const s1 = new Set();
  s1.add(0);
  s1.add(1);

  const s2 = new Set();
  s2.add(1);
  s2.add(2);

  const s = s1.intersection(s2);

  t.plan(1);
  t.looseEqual(s.values(), ["1"]);
});

test("Set difference", t => {
  const s1 = new Set();
  s1.add(0);
  s1.add(1);

  const s2 = new Set();
  s2.add(1);
  s2.add(2);

  const s = s1.difference(s2);

  t.plan(1);
  t.looseEqual(s.values(), ["0"]);
});

test("Set subset", t => {
  const s1 = new Set();
  s1.add(0);
  s1.add(1);

  const s2 = new Set();
  s2.add(1);

  t.plan(1);
  t.equal(s2.subset(s1), true);
});
```

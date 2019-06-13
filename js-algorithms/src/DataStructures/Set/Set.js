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

module.exports = Set;

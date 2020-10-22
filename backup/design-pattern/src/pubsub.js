class EventEmitter {
  constructor() {
    this.listener = new Map()
  }

  on(type, fn) {
    const subs = this.listener.get(type)

    if (!subs) {
      this.listener.set(type, [fn])
    } else {
      this.listener.set(type, [].concat(subs, fn))
    }
  }

  emit(...args) {
    const type = args[0]

    for (let listener of this.listener.get(type)) {
      listener(...args.slice(1))
    }
  }
}

module.exports = EventEmitter

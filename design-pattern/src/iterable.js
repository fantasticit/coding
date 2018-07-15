const data = {
  data: [1, 2, 3, 4, 5, 6],
  [Symbol.iterator]() {
    const len = this.data.length
    let index = 0

    return {
      next: () => {
        return index < len
          ? { value: this.data[index++], done: false }
          : { value: undefined, done: true }
      },
      rewind: () => (index = 0)
    }
  }
}

module.exports = data

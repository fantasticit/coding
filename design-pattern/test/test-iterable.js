const assert = require('assert')
const { Iterable } = require('../index')

describe('Iterable', () => {
  it('is not done', () => {
    const iterator = Iterable[Symbol.iterator]()
    iterator.next()
    assert.equal(iterator.next().done, false)
  })
})

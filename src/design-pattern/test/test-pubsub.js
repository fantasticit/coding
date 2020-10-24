const assert = require('assert')
const { EventEmitter } = require('../index')

describe('EventEmitter', () => {
  it('once emit the listeners should be call', () => {
    const em = new EventEmitter()
    em.on('click', counter => {
      assert.equal(counter, 1)
    })
    em.emit('click', 1)
  })
})

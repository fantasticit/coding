const assert = require('assert')
const { Singleton } = require('../index')

describe('Singleton', () => {
  it('should have only one instance', () => {
    const s1 = new Singleton('s1')
    const s2 = new Singleton('s2')

    assert.strictEqual(s1, s2)
    assert.strictEqual(s1.name, s2.name)
  })
})

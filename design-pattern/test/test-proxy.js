const assert = require('assert')
const { ProxyMultiply } = require('../index')

describe('Proxy', () => {
  it('the result should be cached once it has been calculated', () => {
    ProxyMultiply(1, 2, 3, 4)
    assert.equal(ProxyMultiply(1, 2, 3, 4).cache, true)
  })
})

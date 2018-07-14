const assert = require('assert')
const { Strategy } = require('../index')

describe('Strategy', () => {
  it('the validation can not pass', () => {
    const data = {
      name: 'startegy',
      age: 0
    }

    const config = new Map([['name', 'isNotEmpty'], ['age', 'isGreaterThan']])

    Strategy.Validator.isNotEmpty = new Strategy.Checker(
      val => val.length > 0,
      val => `The ${val} is empty`
    )

    Strategy.Validator.isGreaterThan = new Strategy.Checker(
      number => number > 20,
      number => `The number ${number} is less than 20`
    )

    assert.equal(new Strategy.Validator(config).validate(data).isError(), true)
  })
})

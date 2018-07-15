# 策略模式

顾名思义，根据不同的参数（或配置）有不同的策略（函数）。

## 表单验证

以表单验证为例，不同的字段应有不同的验证方法，即不同的策略。

```javascript
class Checker {
  constructor(check, message) {
    this.check = check
    this.message = message
  }
}

class Validator {
  constructor(config) {
    this.config = config
    this.messages = []
  }

  validate(data) {
    for (let [k, v] of Object.entries(data)) {
      const type = this.config.get(k)
      const checker = Validator[type]
      const result = checker.check(v)

      if (!result) {
        this.messages.push(checker.message(v))
      }
    }

    return this
  }

  isError() {
    return this.messages.length > 0
  }
}
```

测试代码：

```javascript
const data = {
  name: 'startegy',
  age: 0
}

const config = new Map([['name', 'isNotEmpty'], ['age', 'isGreaterThan']])

Validator.isNotEmpty = new Strategy.Checker(
  val => val.length > 0,
  val => `The ${val} is empty`
)

Validator.isGreaterThan = new Strategy.Checker(
  number => number > 20,
  number => `The number ${number} is less than 20`
)

assert.equal(new Validator(config).validate(data).isError(), true)
```

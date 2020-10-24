exports.Checker = class Checker {
  constructor(check, message) {
    ;[this.check, this.message] = [check, message]
  }
}

exports.Validator = class Validator {
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

  toString() {
    return this.messages.join('/n')
  }
}

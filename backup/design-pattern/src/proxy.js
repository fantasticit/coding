const multiply = function(...args) {
  return args.reduce((accu, curr) => (accu *= curr), 1)
}

const proxyMultiply = (() => {
  const cache = {}
  return (...args) => {
    let tag = args.join(',')

    if (cache[tag]) {
      return {
        cache: true,
        value: cache[tag]
      }
    }

    return {
      cache: false,
      value: (cache[tag] = multiply.apply(null, args))
    }
  }
})()

module.exports = proxyMultiply

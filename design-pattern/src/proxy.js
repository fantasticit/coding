const multiply = function(...args) {
  return args.reduce((accu, curr) => (accu *= curr), 1)
}

const proxyMultiply = (() => {
  const cache = {}
  return (...args) => {
    console.log(cache)

    let tag = args.join(',')

    if (cache[tag]) {
      console.log('已缓存：', cache[tag])
      return cache[tag]
    }

    return (cache[tag] = multiply.apply(null, args))
  }
})()

module.exports = proxyMultiply

let __instance = (function() {
  let instance
  return newInstance => {
    if (newInstance) instance = newInstance
    return instance
  }
})()

class Singleton {
  constructor(name) {
    this.name = name

    if (!__instance()) {
      __instance(this)
    }

    return __instance()
  }
}

module.exports = Singleton

function clone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }

  let toStr = Object.prototype.toString
  let newObj = {}
  let isArray = toStr.call(obj) === '[object Array]'
  
  if (isArray) {
    newObj = []
  }
  
  Object.keys(obj).map(key => newObj[key] = clone(obj[key]))
  
  return newObj
}

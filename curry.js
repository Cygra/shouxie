function curry(fn) {
  return function curried(...args1) {
    if (args1.length >= fn.length) {
      return fn(...args1)
    } else {
      return function (...args2) {
        return curried(...args1, ...args2)
      }
    }
  }
}

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
  static resolve(value) {
    return new Promise(resolve => resolve(value))
  }

  static reject(err) {
    return new Promise((_, reject) => reject(err))
  }

  constructor(executor) {
    this.status = PENDING

    this.value = null
    this.reason = null

    this.onResolveCallbacks = []
    this.onRejectCallbacks = []

    const resolve = (v) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = v
        this.onResolveCallbacks.forEach(cb => cb(this.value))
      }
    }

    const reject = (r) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = r
        this.onRejectCallbacks.forEach(cb => cb(this.reason))
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    if (this.status === PENDING) {
      onFulfilled && this.onResolveCallbacks.push(onFulfilled)
      onRejected && this.onRejectCallbacks.push(onRejected)
    }
  }

  catch(onRejected) {
    this.then(null, onRejected)
  }

  finally(callback) {
    this.then(
      v => Promise.resolve(callback()).then(() => v),
      e => Promise.resolve(callback()).then(() => { throw e })
    )
  }
}

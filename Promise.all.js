const PromiseAll = function () {
  return new Promise((resolve, reject) => {
    let count = 0
    let total = 0
    let result = []
    Array.from(arguments).forEach((p, index) => {
      total ++
      Promise.resolve(p).then(res => {
        count ++
        result[index] = res
        if (count === total) {
          resolve(result)
        }
      }).catch((err) => {
        reject(err)
      })
    })
    if (total === 0) {
      resolve([])
    }
  })
}

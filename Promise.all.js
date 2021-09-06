const PromiseAll = function () {
  return new Promise((resolve, reject) => {
    let count = 0
    let total = 0
    let result = []
    Array.from(arguments).forEach((p, index) => {
      total++
      Promise.resolve(p).then(res => {
        count++
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

function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000);
  })
}
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 2000);
  })
}

PromiseAll([fn1(), fn2()]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

Promise.all([fn1(), fn2()]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

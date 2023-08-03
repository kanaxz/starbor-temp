const findSumPair = (numbers, k) => {
  const results = []
  numbers.forEach((n1, i1) => {
    numbers.forEach((n2, i2) => {
      if (i1 === i2) { return }
      if (n1 + n2 === k) {
        results.push([i1, i2])
      }
    })
  })

  if (!results.length) {
    return [0, 0]
  }

  const [result] = results.sort(([a], [b]) => a - b)
  return result
}

const result = findSumPair([2, 3, 4, 5, 6, 7, 8, 9, 1], 10)

console.log(result)

class TestArray extends Array {
  constructor(isTestArray) {
    super()
    console.log({ isTestArray })
    if (!isTestArray) {
      return []
    }
  }
}

const a = new TestArray(true)
a.push(1, 2, 3, 4)
const b = a.map((n) => n)
console.log(a, b)
console.log(b instanceof TestArray)
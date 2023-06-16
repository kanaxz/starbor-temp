class A {
  constructor() {
    Object.defineProperty(this, 'value', { enumerable: true })
  }
}

let value = 1

Object.defineProperty(A.prototype, 'value', {
  get: () => { return value },
  set: (_value) => { value = _value },
  enumerable: true,
})

const instance = new A()

console.log({ ...instance })

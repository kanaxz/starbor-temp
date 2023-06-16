class A {
  m1() { console.log('m1') }
}
class B extends A {
  constructor() {
    super()
    this.b = true
  }
  m2() { console.log('m2') }
}

const i = new A()
i.constructor = B
i.__proto__ = B.prototype
const b = B.constructor()
i.m2()
console.log(B.constructor.toString(), b.constructor.toString())
const t = {}
const r = new b(t)
console.log(t, r)
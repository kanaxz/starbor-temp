class A {
  constructor() {
    this.a = true
  }
}

class C {
  constructor() {
    this.c = true
  }
}

class B {
  constructor() {
    return new C()
  }
}

class D extends B {
  constructor(){
    super()
  }
}

const b = new D()
console.log(b)
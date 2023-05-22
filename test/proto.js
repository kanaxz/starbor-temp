class A { }
class B extends A { }
class C extends B { }
class D extends C { }
[B, C, D, A]
  .sort((a, b) => a.prototype instanceof b)
  .map((t) => t.name)

let constructor = C
while (constructor.prototype.__proto__) {
  console.log(constructor.name)
  constructor = constructor.prototype.__proto__?.constructor
}
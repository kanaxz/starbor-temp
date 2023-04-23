
class ExtensibleFunction extends Function {
  constructor(f) {
    return Object.setPrototypeOf(f, new.target.prototype);
  }
}

class Tree extends ExtensibleFunction {
  constructor() {
    super((...args) => this.call(...args))
  }

  call(...args) {
    console.log(this, ...args)
    return this
  }

  test() {
    console.log('abc')
  }
}

class Intermediate extends Tree {

}

const tree1 = new Intermediate()
const tree2 = tree1(1, 2, 3, 4)
console.log(tree1 === tree2)
tree2.test()
console.log(tree2 instanceof Intermediate)
console.log(tree2 instanceof Tree)
console.log(tree2 instanceof ExtensibleFunction)
tree2.test()


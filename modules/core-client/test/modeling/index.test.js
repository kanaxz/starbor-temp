const Node = require('./Node')
const { expect, assert } = require('chai')

describe('singleInstance', () => {
  it('same instance', () => {
    const n1 = Node.parse({ _id: 1 })
    const n2 = Node.parse({ _id: 1 })
    expect(n1).to.be.equal(n2)
  })
})
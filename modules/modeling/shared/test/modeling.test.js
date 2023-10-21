require('core/setup')

const { expect, assert } = require('chai')
const { Object, String } = require('../types')

class Object1 extends Object {

}

Object1
  .define()
  .properties({
    value: String,
  })

describe('modeling', (t) => {

  it('model from constructor', () => {
    const value = '1'
    const o1 = new Object1({ value })
    expect(o1.value).to.be.equal(value)
  })

  it('model from constructor and shadow clone', () => {
    const o1 = new Object1({ value: '1' })
    const o2 = o1.shadowClone()
    expect(o1.value).to.be.equal(o2.value)
  })
})


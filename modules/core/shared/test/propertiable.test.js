require('../setup')
const Propertiable = require('../mixins/Propertiable')
const mixer = require('../mixer')
const { expect, assert } = require('chai')
const { eventCallback } = require('./utils')

describe('propertiable', (t) => {

  it('mixin', async () => {
    const mixinWithProperties = mixer.mixin([Propertiable], (base) => {
      return class extends base { }
    })
      .define()
      .properties({
        a: 'any'
      })

    class Test extends mixer.extends([mixinWithProperties]) { }
    Test
      .define()
      .properties({
        b: 'any',
      })
    const a = Test.properties.find((p) => p.name === 'a')
    const b = Test.properties.find((p) => p.name === 'b')
    expect(a).to.not.be.equal(null)
    expect(b).to.not.be.equal(null)
  })

  it('inherit and mixin', async () => {
    const M1 = mixer.mixin([Propertiable], (base) => {
      return class extends base { }
    })
      .define()
      .properties({
        m1: 'any'
      })

    class O1 extends mixer.extends([M1]) { }
    O1
      .define()
      .properties({
        o1: 'any',
      })

    class O2 extends O1 {

    }

    O2
      .define()
      .properties({
        o2: 'any',
      })
    const m1 = O2.properties.find((p) => p.name === 'm1')
    const o1 = O2.properties.find((p) => p.name === 'o1')
    const o2 = O2.properties.find((p) => p.name === 'o2')
    expect(m1).to.not.be.equal(null)
    expect(o1).to.not.be.equal(null)
    expect(o2).to.not.be.equal(null)

    const instance = new O2()
    const callback = eventCallback()
    instance.on('propertyChanged:m1', callback)
    instance.m1 = true
    expect(callback.triggered).to.be.equal(true)
    expect(instance.m1).to.be.equal(true)
  })
})


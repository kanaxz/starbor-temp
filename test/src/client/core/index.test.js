require('core-client/setup')
const { System } = require('shared/types')
const { expect, assert } = require('chai')

describe('modeling', (t) => {
  it('equals', () => {
    const system1 = System.parse({
      code: '1',
    })

    const system2 = System.parse({
      code: '1',
    })
    expect(system1 === system2).to.be.equal(true)
  })

  it('equals 2 indexes', () => {
    const system1 = System.parse({
      code: '1',
    })

    const system2 = System.parse({
      _id: '1',
      code: '1',
    })
    expect(system1 === system2).to.be.equal(true)
  })
})
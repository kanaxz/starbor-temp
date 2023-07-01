require('core-server/setup')
require('dotenv').config()
const Node = require('./Node')
const Child = require('./ChildNode')
const { expect, assert } = require('chai')
const database = require('./database')


describe('modeling', (t) => {
  let child, parent, childWithNoParents
  beforeEach(() => {
    parent = Node.parse({
      '@type': 'node',
      _id: '1',
    })

    child = Node.parse({
      '@type': 'child',
      _id: '2',
      parent,
      parents: [parent]
    })


    childWithNoParents = Node.parse({
      '@type': 'child',
      _id: '3',
      parent,
    })
  })

  describe('sync', () => {
    it('model', () => {
      expect(child.parent).to.be.equal(parent)
    })

    it('branch', () => {
      expect(child.parents.length).to.be.equal(1)
    })
  })

  describe('async', () => {
    let db
    beforeEach(async () => {
      const json = [parent, child, childWithNoParents]
        .map((n) => n.toJSON())

      db = await database.get(json)
    })

    afterEach(async () => {
      await db.stop()
      db = null
    })

    it('branch', async () => {
      expect(childWithNoParents.parents.length).to.be.equal(0)
      await childWithNoParents.parents.load()
      expect(childWithNoParents.parents.length).to.be.equal(1)
    })
  })
})


require('core')
const Model = require('core/modeling/Model')
const Branch = require('core/modeling/types/Branch')
const { expect, assert } = require('chai')

class ParentModel extends Model {

}

ParentModel
  .define({
    name: 'test',
    abstract: true,
  })
  .properties({
    parent: ParentModel,
    parents: Branch.of(ParentModel)
  })

class ChildModel extends ParentModel {

}

ChildModel
  .define({
    name: 'child',
  })
  .properties({
    name: 'string',
  })


describe('modeling', (t) => {
  const childName = 'child'

  const parent = ParentModel.parse({
    '@type': 'child',
    name: 'parent',
  })

  const child = ParentModel.parse({
    '@type': 'child',
    name: childName,
    parent,
    parents: [parent]
  })

  it('Parse with child type', () => {
    expect(child).to.be.an.instanceOf(ChildModel)
  })

  it('Parse child property', () => {
    expect(child.name).to.be.equal(childName)
  })

  it('Parent property', () => {
    expect(child.parent).to.be.equal(parent)
  })

  it('Parents property', () => {
    expect(child.parents.length).to.be.equal(1)
    expect(child.parent.length).to.be.equal(1)
  })
})

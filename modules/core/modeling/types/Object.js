const mixer = require('../../mixer')
const Type = require('./Type')
const Bool = require('./Bool')
const Real = require('./Real')

module.exports = class Object extends mixer.extends(Real) {
  static equals(o1, o2) {
    if (o1.constructor !== o2.constructor) {
      return false
    }
    if (o1.constructor !== this) {
      return o1.constructor.equals(o1, o2)
    }
    for (const p of o1.constructor.properties) {
      if (!p.type.equals(o1[p.name], o2[p.name])) {
        return false
      }
    }
    return true
  }

  shadowClone() {
    return new this.constructor(this.toJSON())
  }
}
  .define({
    name: 'object',
    abstract: true,
  })
  .methods({
    is: [[Type], Bool]
  })


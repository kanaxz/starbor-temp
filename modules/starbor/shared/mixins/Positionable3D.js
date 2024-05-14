const mixer = require('core/mixer')
const { Position3D } = require('../types')
const Positionable = require('./Positionable')

module.exports = mixer.mixin([Positionable], (base) => {
  return class Positionable3D extends base {
    getPosition() {
      return {
        '@type': '3DPosition',
        value: this.position
      }
    }
  }
})
  .define()
  .properties({
    posititon: {
      type: Position3D
    }
  })

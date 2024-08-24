const mixer = require('sools-core/mixer')
const { Sphereable, GLTFable, GLTF, Star } = require('starbor')
const SphereObject = require('./SphereObject')
const GLTFObject = require('./GLTFObject')
const StarObject = require('./StarObject')

const types = [
  [Star, (model)=>new StarObject(model)],
  [Sphereable, (model) => new SphereObject(model)],
  [GLTFable, (model) => new GLTFObject(model)],
]

types.getType = (model) => {
  const type = types.find(([t]) => mixer.is(model, t))
  return type?.[1]
}

module.exports = types
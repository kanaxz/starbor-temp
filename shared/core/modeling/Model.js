const mixer = require('../mixer')
const Propertiable = require('../Propertiable')

module.exports = class Model extends mixer.extends([Propertiable()]) {

}.properties({
  _id: 'string',
})

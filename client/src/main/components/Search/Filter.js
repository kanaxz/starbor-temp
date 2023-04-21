const mixer = require('core/mixer')
const Propertiable = require('core/Propertiable')

module.exports = class Filter extends mixer.extends([Propertiable()]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }
}.properties({
  name: 'any',
  value: 'any',
  functionName: 'any',
})

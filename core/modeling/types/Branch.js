const Loadable = require('../mixins/Loadable')
const mixer = require('../../mixer')
const Array = require('./Array')

module.exports = class Branch extends mixer.extends(Array, [Loadable]) {
  
}
  .define({
    name: 'branch',
  })
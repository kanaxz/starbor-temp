const mixer = require('../../mixer')
const Abstractable = require('../../mixins/Abstractable')
const Any = require('./Any')

module.exports = class Real extends mixer.extends([Any, Abstractable]) {

}
  .define({
    name: 'real',
    abstract: true,
  })


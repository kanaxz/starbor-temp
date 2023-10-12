const mixer = require('core/mixer')
const Abstractable = require('core/mixins/Abstractable')
const Equalable = require('core/mixins/Equalable')
const Any = require('./Any')

module.exports = class Real extends mixer.extends([Any, Abstractable, Equalable]) {

}
  .define({
    name: 'real',
    abstract: true,
  })


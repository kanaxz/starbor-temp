const mixer = require('../../mixer')
const Abstractable = require('../../mixins/Abstractable')
const Equalable = require('../../mixins/Equalable')
const Any = require('./Any')

module.exports = class Real extends mixer.extends([Any, Abstractable, Equalable]) {

}
  .define({
    name: 'real',
    abstract: true,
  })


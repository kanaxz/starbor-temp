const mixer = require('../mixer')
const Any = require('./Any')

module.exports = class Object extends mixer.extends([Any]) {

}
  .define({
    name: 'object',
  })

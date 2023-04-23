const mixer = require('../mixer')
const Object = require('./Object')
const Identifiable = require('./mixins/Identifiable')
const Loadable = require('./mixins/Loadable')
const SingleInstance = require('./mixins/SingleInstance')

module.exports = class Model extends mixer.extends(Object, [Loadable, Identifiable, SingleInstance]) {

}
  .define({
    name: 'model',
  })
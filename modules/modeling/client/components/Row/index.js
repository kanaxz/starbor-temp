const { Model } = require('core/modeling/types')
const ModelComponent = require('../ModelComponent')
const template = require('./template.html')

require('./style.scss')


module.exports = class Row extends ModelComponent {

}
  .define({
    name: 'model-row',
    template
  })
  .register(Model, 'row')

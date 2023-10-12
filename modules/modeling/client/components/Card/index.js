const { Model } = require('core/modeling/types')
const ModelComponent = require('../ModelComponent')
const template = require('./template.html')
require('./style.scss')

module.exports = class Card extends ModelComponent {

}
  .define({
    name: 'model-card',
    template,
  })
  .register(Model, 'card')
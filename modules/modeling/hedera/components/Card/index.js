const { Model } = require('modeling/types')
const ModelComponent = require('../ModelComponent')
const template = require('./template.html')
const Pageable = require('modeling/mixins/Pageable')
const { navigator } = require('hedera/global')
const mixer = require('core/mixer')
require('./style.scss')

module.exports = class Card extends ModelComponent {

}
  .define({
    name: 'model-card',
    template,
    type: 'card',
  })
  .variables({
    Pageable,
    navigator,
    mixer,
  })
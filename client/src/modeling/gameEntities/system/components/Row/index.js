const Card = require('modeling-hedera/components/Card')
const template = require('./template.html')
const { System } = require('shared/types')
require('./style.scss')

module.exports = class SystemRow extends Card {

}
  .define({
    name: 'system-row',
    template,
  })
  .register(System, 'row')


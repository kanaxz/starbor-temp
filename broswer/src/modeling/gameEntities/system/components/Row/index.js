const Row = require('modeling-hedera/components/Row')
const template = require('./template.html')
const { System } = require('starbor-shared/types')
require('./style.scss')

module.exports = class SystemRow extends Row {

}
  .define({
    name: 'system-row',
    template,
  })
  .register(System, 'row')


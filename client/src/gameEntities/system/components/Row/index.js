const Card = require('@app/modeling/components/Card')
const template = require('./template.html')
const System = require('shared/models/entities/System')
require('./style.scss')

module.exports = class SystemRow extends Card { }
  .define({
    name: 'system-row',
    template,
  })
  .register(System, 'row')


const Card = require('@app/modeling/components/Card')
const template = require('./template.html')
const { Planet } = require('shared/types')
require('./style.scss')

module.exports = class PlanetRow extends Card { }
  .define({
    name: 'planet-row',
    template,
  })
  .register(Planet, 'row')


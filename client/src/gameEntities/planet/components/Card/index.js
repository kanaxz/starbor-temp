const Card = require('@app/modeling/components/Card')
const template = require('./template.html')
const Planet = require('shared/models/entities/Planet')
const defaultImage = ''
require('./style.scss')

module.exports = class PlanetCard extends Card { }
  .define({
    name: 'planet-card',
    template,
  })
  .variables({
    defaultImage,
  })
  .register(Planet, 'card')


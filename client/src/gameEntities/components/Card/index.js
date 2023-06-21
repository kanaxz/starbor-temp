const Card = require('@app/modeling/components/Card')
const template = require('./template.html')
const defaultImage = require('../../assets/defaultImage.jpg')
const { Entity } = require('shared/types')
require('./style.scss')

module.exports = class SystemCard extends Card { }
  .define({
    name: 'entity-card',
    template,
  })
  .variables({
    defaultImage,
  })
  .register(Entity, 'card')


const Card = require('@app/modeling/components/Card')
const template = require('./template.html')
const System = require('shared/models/entities/System')
const defaultImage = require('../../assets/defaultImage.png')
require('./style.scss')

module.exports = class SystemCard extends Card { }
  .define({
    name: 'system-card',
    template,
  })
  .variables({
    defaultImage,
  })
  .register(System, 'card')


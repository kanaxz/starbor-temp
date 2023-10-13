const Card = require('modeling-client/components/Card')
const template = require('./template.html')
const defaultImage = require('../../assets/defaultImage.jpg')
const { Entity } = require('shared/types')
require('./style.scss')

module.exports = class SystemCard extends Card {
  async update() {
    await super.update()
    if (!this.model) { return }
    await this.model.image?.load()
  }
}
  .define({
    name: 'entity-card',
    template,
  })
  .variables({
    defaultImage,
  })
  .register(Entity, 'card')


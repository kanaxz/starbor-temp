const Card = require('modeling-hedera/components/Card')
const template = require('./template.html')
const defaultImage = require('../../assets/defaultImage.jpg')
const Imageable = require('storage/mixins/Imageable')
require('./style.scss')

module.exports = class ImageableCard extends Card {
  async update() {
    await super.update()
    if (!this.model) { return }
    await this.model.image?.load()
  }
}
  .define({
    name: 'imageable-card',
    template,
  })
  .variables({
    defaultImage,
  })
  .register(Imageable, 'card')


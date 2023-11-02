const Card = require('modeling-hedera/components/Card')
const template = require('./template.html')
const Image = require('storage/Image')
require('./style.scss')

module.exports = class ImageRow extends Card {

}
  .define({
    name: 'image-row',
    template,
  })  
  .register(Image, 'row')


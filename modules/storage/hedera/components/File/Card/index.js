const Card = require('modeling-hedera/components/Card')
const template = require('./template.html')
const File = require('storage/File')
require('./style.scss')

module.exports = class FileCard extends Card {

}
  .define({
    name: 'file-card',
    template,
  })
  .register(File, 'card')


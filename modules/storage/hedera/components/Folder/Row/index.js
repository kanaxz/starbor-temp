const Row = require('modeling-hedera/components/Row')
const template = require('./template.html')
const Folder = require('storage/Folder')
require('./style.scss')

module.exports = class FolderRow extends Row {

}
  .define({
    name: 'folder-row',
    template,
  })  
  .register(Folder, 'row')


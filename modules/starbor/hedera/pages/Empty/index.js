const template = require('./template.html')
const Component = require('hedera/Component')
const { Entity } = require('starbor')
const Folder = require('storage/Folder')
require('./style.scss')

module.exports = class EmptyPage extends Component {

  async onInit() {
    //const folder = new Folder()
    /*
    const folder = await Folder.collection.findByUniqueIndex({ name: 'storage', folder: null })
    this.folder = folder
    */
    this.entity = await Entity.collection.findOne([{ $eq: ['$code', 'PORT-OLISAR'] }], {
      type: 'spaceStation'
    })
  }

  clicked() {
    this.name = Math.random()
    console.log('clicked', this.name)
    //this.grid.add({ name: Math.random() })
  }
}
  .define({
    name: 'empty-page',
    template,
  })
  .properties({
    name: 'any',
  })


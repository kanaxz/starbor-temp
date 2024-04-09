const template = require('./template.html')
const Component = require('hedera/Component')
const Folder = require('storage/Folder')
require('./style.scss')

module.exports = class EmptyPage extends Component {

  async onInit() {
    //const folder = new Folder()
    const folder = await Folder.collection.findByUniqueIndex({ name: 'storage', folder: null })
    console.log({ folder })
    this.folder = folder
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


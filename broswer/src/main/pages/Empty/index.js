const template = require('./template.html')
const Component = require('hedera/Component')
const Folder = require('storage/Folder')
const Loadable = require('modeling/mixins/Loadable')
require('./style.scss')
require('./ChildChild')

module.exports = class EmptyPage extends Component {

  async onInit() {
    //const folder = new Folder()
    const folder = await Folder.collection.findByUniqueIndex({ path: "/storage/upload" })
    console.log(folder)
    await folder.folder.load()
    const folder2 = await Folder.collection.findByUniqueIndex({ path: "/storage/upload" })
    console.log('empty', folder === folder2, folder)
    this.folder = folder
    
    /**/
    //await folder.children.load()
    console.log({ folder }, folder.folder.children.length)
    /*
    setInterval(async () => {
      console.log('fetch')
      const folder2 = await Folder.collection.findByUniqueIndex({ path: "/storage/upload" })
      console.log(folder, folder2, folder === folder2)
    }, 5000)

    /*
    await folder.branch.load({
      children: true
    })

    for (const model of [folder, ...folder.branch]) {
      console.log(model.path, model.loaded, model.branch.loaded, model.children.loaded)
    }
    /**/
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



const Right = require('ressourcing/Right')
const StorageObject = require('./StorageObject')
const setup = require('modeling/setup')

const newName = 'New folder'
module.exports = class Folder extends StorageObject {
  async getNewFolderName(context) {
    await this.children.load(context)
    let newFolderName = newName
    let index = 1
    while (this.children.some((c) => c.name === newFolderName)) {
      newFolderName = `${newName} (${index++})`
    }
    return newFolderName
  }

  async getByPath(...args) {
    const [context, path] = setup.getArgs(args)
    if(path === '/'){
      return this
    }
    await this.children.load(context)
    const [childName, ...remainingPath] = path.split('/').filter((o) => o)
    const child = this.children.find((c) => c.name === childName)
    if(!child){
      throw new Error(`Could not find child with name ${childName}`)
    }
    if (remainingPath.length) {
      return child.getByPath(context, remainingPath.join('/'))
    } else {
      return child
    }
  }
}
  .define({
    name: 'folder',
  })
  .properties({
    add: {
      type: Right,
      state: {
        required: true
      }
    }
  })
  .controllers({
    update: {
      check(context, folder) {
        return context.user?.equals(folder.user)
      }
    }
  })

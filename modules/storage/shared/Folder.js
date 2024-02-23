
const Right = require('ressourcing/Right')
const StorageObject = require('./StorageObject')

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

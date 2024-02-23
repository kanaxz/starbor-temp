const Folder = require('./Folder')
const StorageObject = require('./StorageObject')
const { Branch } = require('modeling/types')
const HasMany = require('modeling/types/HasMany')

StorageObject.properties({
  folder: {
    type: Folder,
    state: {
      required: true,
    }
  },
  branch: {
    type: Branch.of(Folder),
    on: 'folder',
  }
})

Folder.properties({
  children: {
    type: HasMany.of(StorageObject),
    on: 'folder',
  }
})

module.exports = {
  File: require('./File'),
  Folder,
  StorageObject,
  Image:require('./Image')
}
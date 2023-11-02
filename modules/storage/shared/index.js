const Folder = require('./Folder')
const FileSystemObject = require('./FileSystemObject')
const { Branch } = require('modeling/types')
const HasMany = require('modeling/types/HasMany')

FileSystemObject.properties({
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
    type: HasMany.of(FileSystemObject),
    on: 'folder',
  }
})

module.exports = {
  File: require('./File'),
  Folder,
  FileSystemObject,
  ...require('./access'),
  Image:require('./Image')
}
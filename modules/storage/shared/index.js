const Folder = require('./Folder')
const FileSystemObject = require('./FileSystemObject')
const { Branch } = require('modeling/types')

FileSystemObject.properties({
  folder: {
    type: Folder,
    state: {
      required: true,
    }
  },
  branch: {
    type: Branch.of(Folder),
    on: 'parent',
  }
})

module.exports = {
  File: require('./File'),
  Folder,
  Image: require('./Image'),
  FileSystemObject,
  ...require('./access')
}
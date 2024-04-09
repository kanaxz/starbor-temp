const managementSetup = require('management/setup')
const Folderable = require('./mixins/Folderable')
const { Branch } = require('modeling/types')
const HasMany = require('modeling/types/HasMany')
const Folder = require('./Folder')
const StorageObject = require('./StorageObject')

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


managementSetup.user.push(Folderable)
const { Folder, User, FolderAccess, Group } = require('storage')
const { rootPath, uploadPath, uploadName, rootName } = require('./utils')

module.exports = async (req) => {
  console.log('setup storage')

  let storageFolder = await Folder.collection.findOne(req, [{ $eq: ['$path', rootPath] }])
  if (!storageFolder) {
    storageFolder = await Folder.collection.create(req, {
      '@type': 'folder',
      name: rootName,
      path: rootPath,
      group: req.adminGroup,
      access: new FolderAccess({
        read: 'private',
        edit: 'private',
        add: 'private',
      })
    })
  }

  req.storageFolder = storageFolder

  let upload = await Folder.collection.findOne(req, [{ $eq: ['$path', uploadPath] }])
  if (!upload) {
    upload = await Folder.collection.create(req, {
      '@type': 'folder',
      parent: storageFolder,
      group: req.adminGroup,
      name: uploadName,
      path: uploadPath,
      access: new FolderAccess({
        read: 'public',
        edit: 'private',
        add: 'public',
      })
    })
  }
}
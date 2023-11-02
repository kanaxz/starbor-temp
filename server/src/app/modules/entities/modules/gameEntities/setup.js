const { Folder, FolderAccess } = require('storage')

module.exports = async (req) => {
  let entitiesFolder = await Folder.collection.findOne(req, [{ $eq: ['$path', '/storage/entities'] }])
  if (!entitiesFolder) {
    console.log('has user ?', !!req.user)
    await Folder.collection.create(req, new Folder({
      name: 'entities',
      group: req.adminGroup,
      folder: req.storageFolder,
      access: new FolderAccess({
        read: 'public',
        edit: 'owner',
        add: 'group',
      })
    }))
  }
}
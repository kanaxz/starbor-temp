const { Folder } = require('storage')
const { storageName } = require('../utils')
const Right = require('ressourcing/Right')

module.exports = async (context) => {
  const { model: storageFolder } = await Folder.collection.findOrCreate(context, {
    '@type': 'folder',
    name: storageName,
    folder: null,
    read: new Right({
      type: 'public',
    }),
    edit: new Right({
      type: 'none',
    }),
    add: new Right({
      type: 'private',
      owners: [context.user]
    })
  })

  Object.assign(context, {
    storageFolder
  })

  await Folder.collection.findOrCreate(context, {
    '@type': 'folder',
    name: 'users',
    folder: context.storageFolder,
    read: new Right({
      type: 'none',
    }),
    edit: new Right({
      type: 'none',
    }),
    add: new Right({
      type: 'private',
      owners: [context.user]
    })
  })

}
const { Folder } = require('storage')
const { storageName } = require('../utils')
const Right = require('ressourcing/Right')
const { processUser } = require('../utils')

module.exports = async (context) => {
  context.storageFolder = await Folder.collection.create(context, {
    '@type': 'folder',
    name: storageName,
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

  await Folder.collection.create(context, {
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

  await processUser(context, context.user)
}
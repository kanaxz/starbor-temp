const { Folder } = require('storage')
const Right = require('ressourcing/Right')
const { objectToFilter } = require('modeling/processing/utils')

const processUser = async (context, user) => {
  const storageFolder = await Folder.collection.findOne(context, objectToFilter({
    name: 'storage',
    folder: null,
  }))
  const usersFolder = await storageFolder.getByPath(context, '/users')
  if (!usersFolder) {
    throw new Error('users folder not found')
  }
  const folder = await Folder.collection.create(context, {
    '@type': 'folder',
    name: user.username,
    folder: usersFolder,
    read: new Right({
      type: 'public',
    }),
    edit: new Right({
      type: 'none',
    }),
    add: new Right({
      type: 'private',
      owners: [user]
    })
  })

  await user.apply(context, {
    folder
  })

  const private = await Folder.collection.create(context, {
    '@type': 'folder',
    name: 'private',
    folder,
    read: new Right({
      type: 'private',
      owners: [user]
    }),
    edit: new Right({
      type: 'none',
    }),
    add: new Right({
      type: 'inherited',
    })
  })

  await Folder.collection.create(context, {
    '@type': 'folder',
    name: 'upload',
    folder: private,
    read: new Right({
      type: 'inherited',
    }),
    edit: new Right({
      type: 'inherited',
    }),
    add: new Right({
      type: 'inherited',
    })
  })
}
const storageName = 'storage'
const uploadName = 'upload'

module.exports = {
  storageName,
  uploadName,
  processUser,
}
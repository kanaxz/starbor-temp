const { Folder } = require('storage')
const Right = require('ressourcing/Right')

module.exports = async (req) => {
  await Folder.collection.create(req, new Folder({
    name: 'entities',
    folder: req.storageFolder,
    read: new Right({
      type: 'public',
    }),
    edit: new Right({
      type: 'none',
    }),
    add: new Right({
      type: 'private',
      owners: [req.adminGroup]
    })
  }))
}
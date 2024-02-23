const { Folder } = require('storage')
const Right = require('ressourcing/Right')

module.exports = async (req) => {
  let entitiesFolder = await Folder.collection.findOne(req, [{ $eq: ['$name', 'entities'] }, { $eq: ['$folder', null] }])
  if (!entitiesFolder) {
    await Folder.collection.create(req, new Folder({
      name: 'entities',
      read: new Right({
        type: 'public',
      }),
      edit: new Right({
        type: 'private',
        owners: [req.user]
      }),
      add: new Right({
        type: 'private',
        owners: [req.adminGroup]
      })
    }))
  }
}
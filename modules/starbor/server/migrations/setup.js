const { Folder } = require('storage')
const Right = require('ressourcing/Right')
const { Entity } = require('starbor')

module.exports = async (req) => {

  const buildType = async (type, parent) => {
    const { pluralName, name } = type.definition
    if (!pluralName) {
      throw new Error(`Plural name missing for ${name}`)
    }
    const { model: folder } = await Folder.collection.findOrCreate(req, {
      '@type': 'folder',
      name: pluralName,
      folder: parent,
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
    })

    for (const child of type.definition.childs) {
      await buildType(child, folder)
    }
  }

  await buildType(Entity, req.storageFolder)
}
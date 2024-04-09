const { GameEntity } = require('starbor')
const { File, Folder } = require('storage')
const { Group } = require('management')
const Right = require('ressourcing/Right')
const { extname } = require('path')


const getPath = (type) => {
  const { parent } = type.definition
  return `${(parent ? getPath(parent) : '')}/${type.definition.pluralName}`
}

module.exports = {
  dependencies: ['modeling', 'storage', 'management'],
  async construct({ modeling }) {

    modeling.controller(GameEntity, {
      async create(req, gameEntity, next) {
        const admins = await Group.collection.findOne(req, [{ $eq: ['$name', 'admin'] }])
        const entitiesFolder = await Folder.collection.getByPath(req, getPath(gameEntity.constructor))

        const { model: folder } = await Folder.collection.findOrCreate(req, {
          '@type': 'folder',
          name: gameEntity.name,
          folder: entitiesFolder,
          read: new Right({
            type: 'public',
          }),
          edit: new Right({
            type: 'private',
            owners: [admins]
          }),
          add: new Right({
            type: 'private',
            owners: [admins]
          })
        })
        const { image } = gameEntity
        gameEntity.folder = folder
        if (image) {
          await image.load(req)
          gameEntity.image = await File.collection.move(req, gameEntity.image, folder, {
            name: `image${extname(image.name)}`,
            read: new Right({
              type: 'inherited'
            }),
            edit: new Right({
              type: 'inherited'
            })
          })
        }
        await next()
      },
    })
  }
}
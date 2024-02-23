const { Entity, GameEntity } = require('shared/types')
const { File, Folder } = require('storage')
const { Group } = require('management')
const setup = require('./setup')
const Right = require('ressourcing/Right')
const { extname } = require('path')

module.exports = {
  dependancies: ['core', 'modeling', 'storage', 'management'],
  async construct({ core, modeling }) {
    core.onReady(setup)

    modeling.controller(GameEntity, {
      async create(req, gameEntity, next) {
        const admins = await Group.collection.findOne(req, [{ $eq: ['$name', 'admin'] }])
        const entitiesFolder = await Folder.collection.findOne(req, [{ $eq: ['$path', '/entities'] }])
        const folder = new Folder({
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

        await Folder.collection.create(req, folder)
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
const { Entity, GameEntity } = require('shared/types')
const { File, Folder, FolderAccess, Access } = require('storage')
const { Group } = require('management')
const setup = require('./setup')

module.exports = {
  dependancies: ['core', 'modeling', 'storage', 'management', 'processing'],
  async construct({ core, modeling }) {
    core.onReady(setup)

    modeling.controller(GameEntity, {
      async create(req, gameEntity, next) {
        const admins = await Group.collection.findOne(req, [{ $eq: ['$name', 'admin'] }])
        const entitiesFolder = await Folder.collection.findOne(req, [{ $eq: ['$path', '/storage/entities'] }])
        const folder = new Folder({
          group: admins,
          name: gameEntity.name,
          folder: entitiesFolder,
          access: new FolderAccess({
            read: 'parent',
            edit: 'parent',
            add: 'parent',
          })
        })

        await Folder.collection.create(req, folder)
        gameEntity.folder = folder
        if (gameEntity.image) {
          gameEntity.image = await File.collection.move(req, gameEntity.image, folder, {
            access: new Access({
              read: 'parent',
              edit: 'parent'
            })
          })
        }
        await next()
      },
    })
  }
}
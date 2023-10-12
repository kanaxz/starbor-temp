const { Entity, GameEntity, Folder, Group, FolderAccess, Image, Access } = require('shared/types')
const setup = require('./setup')

module.exports = {
  dependancies: ['app', 'modeling', 'storage', 'management', 'processing'],
  async construct({ app, modeling }) {
    app.onReady(setup)

    modeling.controller(GameEntity, {
      async create(req, gameEntity, next) {
        const admins = await Group.collection.findOne(req, [{ $eq: ['$name', 'admin'] }])
        const entitiesFolder = await Folder.collection.findOne(req, [{ $eq: ['$path', '/storage/entities'] }])
        const folder = new Folder({
          group: admins,
          name: gameEntity.name,
          parent: entitiesFolder,
          access: new FolderAccess({
            read: 'parent',
            edit: 'parent',
            add: 'parent',
          })
        })

        await Folder.collection.create(req, folder)
        gameEntity.folder = folder

        gameEntity.image = await Image.collection.move(req, image, folder, {
          access: new Access({
            read: 'parent',
            edit: 'parent'
          })
        })
        await next()
      },
    })
  }
}
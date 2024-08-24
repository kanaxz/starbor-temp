const { GameEntity } = require('starbor')
const { Folder } = require('storage')
const { Group } = require('sools-auth')
const Right = require('ressourcing/Right')
const { objectToFilter } = require('sools-modeling/processing/utils')


const getPath = (type) => {
  const { parent } = type.definition
  let path = ''
  if(parent){
    path += getPath(parent)
  }
  const {pluralName} = type.definition
  if(pluralName){
    path += `/${pluralName}`
  }
  return path
}

module.exports = {
  dependencies: ['modeling', 'storage', 'sools-auth'],
  async construct({ modeling }) {

    modeling.controller(GameEntity, {
      async create(context, gameEntity, next) {
        const admins = await Group.collection.findOne(context, [{ $eq: ['$name', 'admin'] }])
        const storageFolder = await Folder.collection.findOne(context, objectToFilter({
          name: 'storage',
          folder: null,
        }))
        const path = getPath(gameEntity.constructor)
        const entitiesFolder = await storageFolder.getByPath(context, path)

        gameEntity.folder = await Folder.collection.create(context, {
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
        await next()
      },
    })
  }
}
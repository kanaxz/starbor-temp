const { Model, String } = require('modeling/types')
const Right = require('ressourcing/Right')
const RessourceOwner = require('ressourcing/RessourceOwner')
const ControllerError = require('modeling/controlling/ControllerError')

module.exports = class StorageObject extends Model {

}
  .define({
    name: 'storageObject',
    pluralName: 'storage',
    abstract: true,
    root: true,
  })
  .indexes({
    path: {
      properties: ['name', 'folder'],
      unique: true,
    }
  })
  .properties({
    name: {
      type: String,
      state: {
        required: true
      },
    },
    read: {
      type: Right,
      state: {
        required: true
      },
    },
    edit: {
      type: Right,
      state: {
        required: true
      },
    }
  })
  .controllers({
    create: {
      async check(context) {
        if (!context.user) {
          throw new ControllerError(`You must be logged in to create a storage object`)
        }
      },
      async logic(context, states) {
        if (context.setup) {
          states.folder.required = false
        }
      }
    },
    delete: {
      check: async (context, storageObject) => {

      }
    }
  })
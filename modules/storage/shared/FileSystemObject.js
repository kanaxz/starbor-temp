const { Model, String, Number } = require('modeling/types')
const { User, Group } = require('management')
const { Access } = require('./access')


module.exports = class FileSystemObject extends Model {

}
  .define({
    name: 'fileSystemObject',
    pluralName: 'storage',
    abstract: true,
    root: true,
  })
  .properties({
    name: {
      type: String,
      state: {
        required: true
      },
    },
    path: {
      type: String,
      state: {
        disabled: true,
      }
    },
    owner: {
      type: User,
      state: {
        disabled: true,
      }
    },
    group: {
      type: Group,
    },
    size: {
      type: Number,
      required: true,
    },
    access: {
      type: Access,
    }
  })
  .indexes({
    path: {
      properties: ['path'],
      unique: true,
    }
  })
  .controllers({
    create: {
      logic(context, states) {
        if (Object.values(states.access).some((v) => v === 'group')) {
          states.group.required = true
        }
      }
    }
  })
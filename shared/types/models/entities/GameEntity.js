const Entity = require('./Entity')
const Starmap = require('../../objects/Starmap')
const mixer = require('core/mixer')
const Pageable = require('../../../mixins/Pageable')
const Markdown = require('../../Markdown')
const { String } = require('modeling/types')
const { Folder, File, Image } = require('storage')

const isAdmin = async (context) => {
  return await context.user?.is('admin')
}

module.exports = class GameEntity extends mixer.extends(Entity, [Pageable]) {
  toString() {
    return this.name || this.code || this._id
  }
}
  .define({
    name: 'gameEntity',
    abstract: true,
    searchField: 'name',
  })
  .indexes({
    code: {
      properties: ['code'],
      unique: true,
    },
    name: {
      properties: ['name'],
      unique: true,
    }
  })
  .properties({
    code: {
      type: String,
      state: {
        required: true,
      }
    },
    description: {
      type: Markdown,
      state: {
        required: true
      }
    },
    starmap: Starmap,
    image: {
      type: Image,
      state: {
        required: true,
      }
    },
    folder: {
      type: Folder,
      state: {
        disabled: true,
      }
    }
  })
  .controllers({
    create: {
      check(context) {
        return isAdmin(context)
      },
      async logic(context, states) {
        states.code.value = states.code.value?.toUpperCase()
        states.folder.disabled = true
        states.organization.filters.push({
          $match: ['$name', '^U']
        })

        const organization = states.organization.value
        if (organization) {
          await organization.load()
          if (organization?.name !== 'UEE') {
            states.organization.errors.push('ntm')
          }
        }
      }
    },
    update: {
      check(context, gameEntity) {
        return isAdmin(context)
      },
      logic(context, states) {
        states.code.value = states.code.value.toUpperCase()
      }
    }
  })
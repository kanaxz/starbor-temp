const Entity = require('./Entity')
const mixer = require('core/mixer')
const Pageable = require('modeling/mixins/Pageable')
const { String, Markdown } = require('modeling/types')
const Imageable = require('storage/mixins/Imageable')
const Folderable = require('storage/mixins/Folderable')
const Wikiable = require('wiki/mixins/Wikiable')
const ControllerError = require('modeling/controlling/ControllerError')
const Mapeable = require('../../../mixins/Mapeable')

const isAdmin = async (context) => {
  if (!await context.user?.is(context, 'admin')) {
    throw new ControllerError('You are not admin')
  }
}

const commonLogic = (context, states) => {
  states.code.value = states.code.value?.toUpperCase()
  states.folder.disabled = true
  states.image.ration = '2:1'
}

module.exports = class GameEntity extends mixer.extends(Entity, [Pageable, Mapeable, Folderable, Imageable, Wikiable]) {
  toString() {
    return this.name
  }
}
  .define({
    name: 'gameEntity',
    abstract: true,
    pluralName:'gameEntities',
    searchField: 'name',
    codeField: 'code',
  })
  .indexes({
    code: {
      properties: ['code', '@type'],
      unique: true,
    },
    name: {
      properties: ['name', '@type'],
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
  })
  .controllers({
    create: {
      check(context) {
        return isAdmin(context)
      },
      async logic(context, states) {
        commonLogic(context, states)
      }
    },
    update: {
      check(context, gameEntity) {
        return isAdmin(context)
      },
      logic(context, states) {
        commonLogic(context, states)
      }
    }
  })
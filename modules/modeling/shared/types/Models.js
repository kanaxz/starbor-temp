const setup = require('../setup')
const mixer = require('core/mixer')
const Destroyable = require('core/mixins/Destroyable')
const BaseModels = require('./BaseModels')

module.exports = class Models extends mixer.extends(BaseModels, [Destroyable, ...setup.models.before]) {

}
  .define()

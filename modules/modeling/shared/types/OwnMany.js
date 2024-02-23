const mixer = require('core/mixer')
const ArrayAssociation = require('./ArrayAssociation')
const { ownMany } = require('../setup')

module.exports = class OwnMany extends mixer.extends(ArrayAssociation, ownMany.before) {

  async innerLoad(context, paths = {}) {
    for (const model of this) {
      await model.load(context, paths)
    }
  }

  setPathsState(state, paths, err) {
   
  }
}
  .define({
    name: 'ownMany',
  })
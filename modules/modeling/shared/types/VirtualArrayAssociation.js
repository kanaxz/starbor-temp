const mixer = require('core/mixer')
const ArrayAssociation = require('./ArrayAssociation')
const { hasMany } = require('../setup')


module.exports = class VirtualArrayAssociation extends ArrayAssociation {
  toJSON(paths, context) {
    if (!paths) { return undefined }
    return super.toJSON(paths, context)
  }
}
  .define()
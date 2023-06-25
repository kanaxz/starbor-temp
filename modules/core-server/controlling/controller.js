const Controlleable = require('core/modeling/controlling/Controlleable')

module.exports = {
  type: Controlleable,
  async update(req, model, old, next) {
    const canUpdate = await old.canUpdate(req.user)
    if (!canUpdate) {
      throw new Error('Cannot update')
    }
    return next()
  },
  async delete(req, model, next) {
    const canDelete = await model.canDelete(req.user)
    if (!canDelete) {
      throw new Error('Cannot delete')
    }
    return next()
  }
}

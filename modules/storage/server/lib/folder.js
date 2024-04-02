const { Folder } = require('storage')

module.exports = async ({ modeling }) => {
  modeling.controller(Folder, {
    async create(req, folder, next) {
      await next()
    },
  })
}
const { FileSystemObject } = require('storage')

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(FileSystemObject, {
      async create(req, object, next) {
        object.owner = req.user
        await next()
      },
    })
  }
}
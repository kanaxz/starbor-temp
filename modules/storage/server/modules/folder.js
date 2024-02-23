const { Folder } = require('storage')

module.exports = {
  dependancies: ['modeling', 'config'],
  async construct({ modeling, config }) {
    modeling.controller(Folder, {
      async create(req, folder, next) {
        await next()
      },
    })
  }
}
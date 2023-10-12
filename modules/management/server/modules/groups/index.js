const { Group } = require('management')

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(Group, {
      async find(req, pipeline, query, next) {
        return next()
      },
      async create(req, group, next) {
        group.owner = req.user
        await next()
      },
      async update(req, group, oldGroup, next) {
        await next()
      },
    })
  }
}
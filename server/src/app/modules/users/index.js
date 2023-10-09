const { User, Roles } = require('shared/types')
const { encryptPassword } = require('../auth/utils')




module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(User, {
      async find(req, pipeline, query, next) {
        pipeline.unshift({
          $unset: ['password']
        })

        return next()
      },
      async create(req, user, next) {
        user.password = await encryptPassword(user.password)
        await next()
        delete user.password
      },
      async update(req, user, oldUser, next) {
        if (user.password !== oldUser.password) {
          user.password = await encryptPassword(user.password)
        }
        await next()
        delete user.password
      },
    })
  }
}
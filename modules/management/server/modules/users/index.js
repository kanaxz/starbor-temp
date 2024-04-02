const { User } = require('management')
const { encryptPassword } = require('../auth/utils')

module.exports = {
  dependencies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(User, {
      async query(req, stages) {
        return [
          {
            mongo: {
              $unset: ['password']
            }
          },
          ...stages
        ]
      },
      async create(req, user, next) {
        user.password = await encryptPassword(user.password)
        await next()
        delete user.password
      },
      async update(req, user, oldUser, next) {
        if (user.password) {
          user.password = await encryptPassword(user.password)
        }
        await next()
        delete user.password
      },
    })
  }
}
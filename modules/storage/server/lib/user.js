const { User } = require('management')
const { processUser } = require('../utils')

module.exports = async ({ modeling }) => {
  modeling.controller(User, {
    async create(context, user, next) {
      await next()
      if (context.setup) { return }

      await processUser(context, user)
    },
  })
}

const { User, Roles } = require('shared/types')
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(User, {
      async find(req, pipeline, next) {
        pipeline.unshift({
          $unset: ['password']
        })

        return next()
      },
      async create(req, user, next) {
        if (req.user) {
          throw new Error('You are already connected')
        }
        const { username, password } = user
        if (!username || !password) {
          throw new Error(`User informations missing`)
        }
        const existingUser = await modeling.collections.users.findOne(req, {
          username,
        })
        if (existingUser) {
          throw new Error(`Username '${username}' already taken `)
        }

        user.password = await bcrypt.hash(password, saltRounds)
        user.roles = new Roles({
          admin: false,
        })

        await next()
      }
    })
  }
}
const { User, Roles } = require('shared/types')
const bcrypt = require('bcrypt')
const saltRounds = 10;


const isAdminOrSelf = (req, user) => {
  if (!req.user.roles.admin && req.user.id !== user._id) {
    throw new Error('Cannot update user')
  }
}

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds)
}

const logic = () => {

}

const userLogiq = logic({
  username: {
    required: true
  },
  password: {
    required: true,
  }
})

const emptyRoles = new Roles({
  admin: false,
  editor: false,
})

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

        user.password = await encryptPassword(password)
        if (!req.user.roles.admin && !user.roles.equals(emptyRoles)) {
          throw new Error('Cannot change roles')
        }


        await next()
        delete user.password
      },
      async update(req, user, oldUser, next) {
        isAdminOrSelf(req, user)
        if (!req.user.roles.admin && !user.roles.equals(oldUser.roles)) {
          throw new Error('Cannot change roles')
        }

        if (user.password !== oldUser.password) {
          user.password = await encryptPassword(user.password)
        }
        await next()
        delete user.password
      },
      async delete(req, user, next) {
        isAdminOrSelf(req, user)
        return next()
      }
    })
  }
}
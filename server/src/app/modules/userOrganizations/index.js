const { User, Member, Invitation, UserOrganization } = require('shared/types')

const isLogged = (req, user) => {
  if (!req.user.connexion) {
    throw new Error('You must be logged in to create a clan')
  }
}

const isAdmin = (req, user, UserOrganization, member) => {
  if (!req.user.admin && req.UserOrganization.owner._id !== member.user._id) {
    throw new Error('You do not have sufficient rights to perform this action')
  }
}

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {

    modeling.controller(UserOrganization, {
      async find(req, pipeline, query, next) {
        return next()
      },
      async create(req, user, UserOrganization, next) {
        isLogged(req, user)
        await next()
      },
      async update(req, user, UserOrganization, member, next) {
        isAdmin(req, UserOrganization, user, member)
        await next()
      },
      async delete(req, user, UserOrganization, member, next) {
        isAdmin(req, UserOrganization, user, member)
        return next()
      }
    })
  }
}
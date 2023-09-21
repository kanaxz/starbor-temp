const { User, Member, Invitation, UserOrganization } = require('shared/types')

const isLogged = (req) => {
  if (!req.user) {
    throw new Error('You must be logged in to create a clan')
  }
}

const isAdminOrOwner = (req, organization) => {
  if (!req.user.roles.admin || organization.owner._id === req.user._id) {
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
      async create(req, userOrganization, next) {
        userOrganization.owner = req.user
        userOrganization.private = false
        isLogged(req)
        await next()
      },
      async update(req, userOrganization, oldUserOrganization, next) {
        isAdminOrOwner(req, oldUserOrganization)
        await next()
      },
      async delete(req, userOrganization, next) {
        isAdminOrOwner(req, userOrganization)
        return next()
      }
    })
  }
}
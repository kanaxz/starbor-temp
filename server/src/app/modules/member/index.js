const { User, Member, Invitation, UserOrganization } = require('shared/types')
const userOrganizations = require('../userOrganizations')

const isAdmin = (req) => {
  if (!req.user?.roles.admin) {
    throw new Error('You are not allowed to create a new member.')
  }
}

const isMember = (req, member, UserOrganization) => {
  if (!req.member.userOrganization._id !== UserOrganization._id) {
    throw new Error('You are not a member of this organization.')
  }
}

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {

    modeling.controller(Member, {
      async find(req, pipeline, query, UserOrganization, next) {
        if (!UserOrganization.private) {
          return next()
        } else {
          //
        }
      },
      async create(req, member, next) {
        isAdmin(req)
        await next()
      },
      async delete(req, member, next) {
        isMember(req, member, UserOrganization)
        isAdmin(req)
        return next()
      }
    })
  }
}
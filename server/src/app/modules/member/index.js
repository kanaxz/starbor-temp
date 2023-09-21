const { User, Member, Invitation, UserOrganization } = require('shared/types')
const userOrganizations = require('../userOrganizations')

const isAdmin = (req) => {
  if (!req.user?.roles.admin) {
    throw new Error('You are not allowed to create a new member.')
  }
}

const isMember = (req, member) => {
  if (!req.member.userOrganization._id !== UserOrganization._id) {
    throw new Error('You are not a member of this organization.')
  }
}

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {

    modeling.controller(Member, {
      async find(req, pipeline, query, next) {
        if (!UserOrganization.private) {
          return next()
        } else {
          //
        }
      },
      async create(req, member, next) {
        modeling.collections.invitations.findOne(req, {

        })
        isAdmin(req)
        await next()
      },
      async delete(req, member, next) {
        await member.load(req, {
          userOrganization: {
            members: true,
          }
        })
        const isMember = member.userOrganization.members.any((member) => {
          return member.user._id === req.user._id
        })
        if (!isMember && !req.user.roles.admin) {
          throw new Error()
        }
        return next()
      }
    })
  }
}
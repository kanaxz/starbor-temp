const { User, member } = require('shared/types')

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {

    modeling.controller(member, {
      async find(req, pipeline, query, next) {
        return next()
      },
      async create(req, user, next) {
        await next()
      },
      async update(req, invitation, oldInvitation, next) {
        if (!req.user) {
          throw new Error('')
        }
        authorizeOnly(['status'], invitation, oldInvitation)
        if (invitation.status === oldInvitation.status) {
          throw new Error('You are not supposed to call update without changing status')
        }
        await invitation.load({
          organization: {
            owner: true
          }
        })
        const { owner } = invitation.organization
        if (invitation.status !== oldInvitation.status) {
          if (invitation.initiator === 'user') {
            if (req.user._id === invitation.user._id) {
              if (['pending', 'accepted', 'canceled'].indexOf(invitation.status) !== -1) {
                throw new Error()
              }
            } else if (req.user._id === owner._id) {
              if (['pending', 'canceled', 'canceled'].indexOf(invitation.status) !== -1) {
                throw new Error()
              }
            }
          }
        }

        await next()

        if (invitation.status === 'accepted') {
          const member = new Member({
            organization: invitation.organization,
            user: invitation.user,
            creationDate: new Date()
          })
          await collections.members.create(adminReq, member)
        }

        if (['canceled', 'accepted'].indexOf(invitation.status) !== -1) {
          await collections.invitations.delete(req, invitation)
        }
      },
      async delete(req, user, next) {
        return next()
      }
    })
  }
}
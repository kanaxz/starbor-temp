const Jwt = require('jwt/Jwt')
const crypto = require('crypto')
const { encryptPassword } = require('management-server/modules/auth/utils')
const { makeId } = require('core/utils/string')
module.exports = {
  name: 'jwt-modeling',
  dependencies: ['modeling', 'management', 'express'],
  construct({ modeling, express }) {
    modeling.controller(Jwt, {
      async find(req, stages) {
        if (!req.user) {
          throw new Error('Cannot access')
        }

        return [
          {
            mongo: {
              $unset: ['key']
            }
          },
          ...stages,
          {
            filter: [{
              $and: [
                {
                  $eq: ['$user', req.user.getIndex('id')]
                },
                ...query
              ]
            }]
          }
        ]
      },
      async create(req, jwt, next) {
        const keyHex = crypto.randomBytes(64).toString('hex')
        const key = await encryptPassword(keyHex)
        const id = makeId()
        Object.assign(jwt, {
          user: req.user,
          id,
          key
        })
        await next()
        jwt.key = keyHex
      },
      async update(req, jwt, old, next) {
        await next()
      }
    })
  }
}
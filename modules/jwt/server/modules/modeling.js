const Jwt = require('jwt/Jwt')
const crypto = require('crypto')
const { encryptPassword } = require('management-server/modules/auth/utils')

module.exports = {
  name: 'jwt-modeling',
  dependancies: ['modeling', 'management', 'express'],
  construct({ modeling, express }) {
    modeling.controller(Jwt, {
      async find(req, pipeline, query, next) {
        if (!req.user) {
          throw new Error('Cannot access')
        }
        query = [{
          $and: [
            {
              $eq: ['$user', req.user]
            },
            ...query
          ]
        }]

        pipeline.unshift({
          $unset: ['key']
        })

        return next(query)
      },
      async create(req, jwt, next) {
        const keyHex = crypto.randomBytes(64).toString('hex')
        const key = await encryptPassword(keyHex)
        Object.assign(jwt, {
          user: req.user,
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
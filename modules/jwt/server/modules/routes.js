const jsonwebtoken = require('jsonwebtoken')
const { tokenDuration } = require('../utils')
const moment = require('moment')
const { handleError } = require('core-server/errors')
const { matchPassword } = require('management-server/modules/auth/utils')

module.exports = {
  name: 'jwt-routes',
  after: 'express',
  dependancies: ['mongo', 'express'],
  construct({ express, mongo }) {
    const { db } = mongo
    const tokens = db.collection('tokens')
    const jwts = db.collection('jwts')
    const users = db.collection('users')

    express.use(async (req, res, next) => {
      try {
        if (req.user) {
          next()
          return
        }
        const { authorization } = req.headers
        const [, token] = authorization?.split(' ') || []
        if (token == null) {
          next()
          return
        }

        const tokenInfos = await tokens.findOne({
          token
        })

        if (!tokenInfos) { throw new Error('Invalid token') }

        const userId = await jwt.verify(token, tokenInfos.secret)

        const user = await users.findOne({
          _id: userId,
        })
        req.user = user
        next()
      } catch (err) {
        handleError(err)
      }
    })

    express.route('/jwt-token', async (req, res, next) => {
      try {
        const { id, key } = req.body
        const jwt = await jwts.findOne({
          id,
        })
        if (!jwt) {
          throw new Error('Jwt not found')
        }

        if (!await matchPassword(key, jwt.key)) {
          throw new Error('Jwt not found')
        }
        const expireDate = moment().add(tokenDuration, 'seconds')
        const secret = crypto.randomBytes(64).toString('hex')
        const token = jsonwebtoken.sign(jwt.user._id, secret, { expiresIn: `${tokenDuration}s` })
        const tokenInfos = {
          expireDate,
          token,
        }
        await tokens.insertOne({
          jwtId: jwt._id,
          ...tokenInfos,
          secret,
        })
        res.json(tokenInfos)
      } catch (err) {
        handleError(err)
      }
    })
  }
}
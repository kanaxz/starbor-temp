const { nanoid } = require('nanoid')
const moment = require('moment')
const { User } = require('management')

const TOKEN_KEY = 'sessionToken'
const TOKEN_AGE = 30
module.exports = {
  dependencies: ['express', 'mongo'],
  after: 'express',
  async construct({ express, mongo }) {
    const collection = mongo.db.collection('sessions')
    const userCollection = mongo.db.collection('users')

    const get = async (token) => {
      let session = await collection.findOne({
        _id: token,
      })
      if (session) {
        if (session.expireDate < new Date()) {
          await collection.deleteOne({
            _id: token,
          })
          session = null
        }
      }
      return session
    }

    const processCookie = async (req) => {
      const token = req.cookies[TOKEN_KEY]
      if (!token) { return }

      const session = await get(token)
      if (!session) { return }

      const user = await userCollection.findOne({
        _id: session.userId,
      })
      if (!user) { return }
      delete user.password
      req.user = User.parse(user)
    }
    express.use(async (req, res, next) => {
      try {
        await processCookie(req)
        next()
      } catch (err) {
        console.error(err)
        next(err)
      }
    })

    const update = async (req, res) => {
      let session = await collection.findOne({
        userId: req.user._id,
      })

      if (!session) {
        session = {
          _id: nanoid(),
          userId: req.user._id,
        }

        await collection.insertOne(session)
      }

      session.expireDate = moment().add(TOKEN_AGE, 'days').toDate()

      await collection.updateOne({
        _id: session._id,
      }, {
        $set: session
      })

      res.cookie(TOKEN_KEY, session._id, {
        maxAge: 1000 * 60 * 60 * 24 * TOKEN_AGE,
        httpOnly: true
      })
    }

    const destroy = async (req, res) => {
      await collection.deleteOne({
        userId: req.user._id,
      })
      res.clearCookie(TOKEN_KEY)
    }

    return {
      update,
      destroy
    }
  }
}
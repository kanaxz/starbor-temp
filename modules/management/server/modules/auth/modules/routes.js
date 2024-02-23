const { User } = require('management')
const bcrypt = require('bcrypt')
const exp = require('express')
const { encryptPassword, matchPassword } = require('../utils')
const { defaultLoad } = require('management/utils')

module.exports = {
  name: 'auth-routes',
  after: 'sessions',
  dependancies: ['sessions', 'express', 'mongo', 'modeling'],
  async construct({ sessions, express, mongo, modeling }) {
    const { collections } = modeling
    const userCollection = mongo.db.collection('users')
    const router = exp.Router()
    const loggedOut = (req, res, next) => {
      if (!req.user) {
        return next()
      }
    }

    const loggedIn = (req, res, next) => {
      if (req.user) {
        return next()
      }
    }
    express.use('/api/auth', router)

    const handleError = (res, error) => {
      console.error(error)
      res
        .status(500)
        .json({
          success: false,
          message: error.message,
        })
    }

    const sendMe = async (req) => {
      const { res, user } = req
      if (!user) {
        return res.send({
          me: null
        })
      }
      await user.load(req, defaultLoad)
      const me = user.toJSON(defaultLoad)
      res.send({
        me
      })
    }

    router.post('/me', async (req, res) => {
      await sendMe(req)
    })

    router.post('/logout', async (req, res) => {
      if (req.user) {
        await sessions.destroy(req, res)
      }

      res.json({
        success: true,
      })
    })

    router.post('/signup', loggedOut, async (req, res) => {
      try {
        const user = await collections.users.create(req, req.body)
        req.user = user

        await sessions.update(req, res)
        await sendMe(req)
      } catch (err) {
        handleError(res, err)
      }
    })

    router.post('/change-password', loggedIn, async (req, res) => {
      try {
        const user = await userCollection.findOne({
          _id: req.user._id,
        })

        const match = await matchPassword(req.body.currentPassword, user.password)
        if (!match) {
          throw new Error('Invalid credentials')
        }

        const newHashedPassword = await encryptPassword(req.body.newPassword)
        await userCollection.updateOne({
          _id: req.user._id,
        }, {
          $set: {
            password: newHashedPassword
          }
        })
        res.json({
          success: true,
        })
      } catch (err) {
        handleError(res, err)
      }
    })


    router.post('/login', loggedOut, async (req, res) => {
      try {
        const { username, password } = req.body
        if (!username || !password) {
          throw new Error(`User informations missing`)
        }

        const user = await userCollection.findOne({
          username,
        })

        if (!user) {
          throw new Error('User not found')
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          throw new Error('Invalid credentials')
        }

        delete user.password
        const userModel = new User(user)
        req.user = userModel

        await sessions.update(req, res)
        await sendMe(req)
      } catch (err) {
        handleError(res, err)
      }
    })
  }
}
const { User } = require('management')
const bcrypt = require('bcrypt')
const exp = require('express')
const { encryptPassword, matchPassword } = require('../utils')

module.exports = {
  name: 'auth-routes',
  after: 'sessions',
  dependancies: ['sessions', 'express', 'mongo', 'processing'],
  async construct({ sessions, express, mongo, processing }) {
    const { collections } = processing
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

    router.post('/me', async (req, res) => {
      const load = {
        memberships: {
          group: true
        }
      }
      await req.user?.load(req, load)
      const user = req.user?.toJSON(load)
      res.json({
        me: user,
      })
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
      console.log('signup')
      try {
        const user = await collections.users.create(req, req.body)
        req.user = user
        await sessions.update(req, res)
        res.json({
          me: user.toJSON()
        })
      } catch (err) {
        handleError(res, err)
      }
    })

    router.post('/change-password', loggedIn, async (req, res) => {
      console.log('change-password')
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
      console.log('login')
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
        console.log('updating session')
        await sessions.update(req, res)

        res.json({
          me: userModel.toJSON()
        })
      } catch (err) {
        handleError(res, err)
      }
    })
  }
}
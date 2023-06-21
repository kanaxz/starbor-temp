const { User, Roles } = require('shared/types')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const exp = require('express')
const saltRounds = 10;
const moment = require('moment')

module.exports = {
  name: null,
  dependancies: ['sessions', 'express', 'mongo', 'modeling'],
  async construct({ sessions, express, mongo, modeling }) {
    const userCollection = mongo.db.collection('users')
    const router = exp.Router()
    const connectedMiddleware = (req, res, next) => {
      if (!req.user) {
        return next()
      }
    }
    express.use('/api/auth', router)

    const handleError = (res, error) => {
      console.error(error)
      res
        .status(500)
        .json({
          message: err.message,
        })
    }

    router.post('/me', async (req, res) => {
      const user = req.user?.toJSON()
      res.json({
        me: user,
      })
    })

    router.post('/logout', async (req, res) => {
      await sessions.destroy(req, res)
      res.json({
        success: true,
      })
    })

    router.post('/signup', connectedMiddleware, async (req, res) => {
      console.log('signup')
      try {
        const user = await modeling.collections.users.create(req.body)
        req.user = user
        await sessions.update(req, res)
        res.json({
          me: user.toJSON()
        })
      } catch (err) {
        handleError(res, error)
      }
    })

    router.post('/login', connectedMiddleware, async (req, res) => {
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
        handleError(res, error)
      }
    })
  }
}
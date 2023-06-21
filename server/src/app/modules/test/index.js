const { User, Roles } = require('shared/types')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
  dependancies: ['users', 'express', 'mongo', 'modeling'],
  async construct({ express, mongo, modeling }) {
    return
    try {
      console.log('----------TESTING------------')
      const req = {}
      const kanax = await modeling.collections.users.create(req, {
        username: 'kanax',
        password: 'baskets'
      })

      console.log(kanax.toJSON())
    } catch (err) {
      console.error(err)
    }
  }
}
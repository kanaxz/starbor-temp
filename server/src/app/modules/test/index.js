const { User, Roles } = require('shared/types')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
  dependancies: ['users', 'express', 'mongo', 'modeling'],
  async construct({ express, mongo, modeling }) {
    try {
      return
      console.log('----------TESTING------------')
      const req = {}
      const result = await modeling.collections.entities.find(req, [{
        $not: [{ $is: ['$this', 'star'] }]
      }], {
        limit: 2,
        load: {
          children: true,
        }
      })
      /*
      const json = result.map((r) => r.toJSON({ children: false }))
      console.log(JSON.stringify(json, null, ' '))
      /**/
    } catch (err) {
      console.error(err)
    }
  }
}
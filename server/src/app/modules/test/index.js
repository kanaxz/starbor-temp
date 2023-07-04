const { User, Roles } = require('shared/types')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
  dependancies: ['users', 'express', 'mongo', 'modeling'],
  async construct({ express, mongo, modeling }) {
    try {
      const req = {}
      const microTech = await modeling.collections.entities.findOne(req, [{
        $eq: ['$name', 'microTech']
      }], {
        load: {
          parents: true,
        }
      })

      //await microTech.parents.load()
      //console.log([...microTech.parents])


      /*
      const json = result.map((r) => r.toJSON({ children: false }))
      console.log(JSON.stringify(json, null, ' '))
      /**/
    } catch (err) {
      console.error(err)
    }
  }
}
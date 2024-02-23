const { Group } = require('management')

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(Group, {

    })
  }
}
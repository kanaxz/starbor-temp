const { Group } = require('management')

module.exports = {
  dependencies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(Group, {

    })
  }
}

const setup = require('./setup')

module.exports = {
  name: 'management',
  dependancies: ['app'],
  async construct({ app }) {
    app.onReady(setup)
  }
}
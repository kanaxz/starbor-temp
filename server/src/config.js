const { join } = require('path')

module.exports = {
  root: __dirname,
  dist: join(__dirname, '../dist'),
  express: {
    port: 8000,
  },
  mongo: {
    url: 'mongodb://127.0.0.1:27018/',
    db: 'star-citizen-universe'
  },
}
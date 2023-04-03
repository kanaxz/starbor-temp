const { join } = require('path')

module.exports = {
  root: __dirname,
  dist: join(__dirname, '../dist'),
  express: {
    port: 8000,
  },
  mongo: {
    url: 'mongodb://mongodb:27017/star-citizen-universe',
    db: 'sandbox'
  },
}
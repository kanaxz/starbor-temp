const { join } = require('path')

module.exports = {
  root: __dirname,
  dist: join(__dirname, '../dist'),
  express: {
    port: 8000,
  },
  mongo: {
    url: 'mongodb://172.22.192.1:27017',
    db: 'sandbox'
  },
}
const config = require('sools-core/config')

module.exports = config(
  require('./base'),
  require('./local'),
)
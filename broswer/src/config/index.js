const config = require('core/config')

module.exports = config(
  require('./base'),
  require('./local'),
)
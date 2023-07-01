const setup = require('core/setup')

setup.server = {
  mongo: {
    logPipeline: false,
  }
}

module.exports = setup
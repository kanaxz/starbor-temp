const event = require.main.require('./core/event')

module.exports = {
  construct() {
    const onReady = event()

    return {
      onReady
    }
  }
}
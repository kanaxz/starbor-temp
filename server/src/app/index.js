const Event = require('core/types/Event')

module.exports = {
  construct() {
    const onReady = new Event()

    return {
      onReady
    }
  }
}
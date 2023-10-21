const Event = require('core/types/Event')

module.exports = {
  name: 'core',
  construct() {
    const onReady = new Event()
    return {
      onReady,
    }
  }
}
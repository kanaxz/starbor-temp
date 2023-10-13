const template = require('./template.html')
const Root = require('hedera/Root')
require('../notifications/List')
require('../modal')
require('../notifications')
require('../gameEntities')
require('../organization')
require('../main')
require('../api')
require('./style.scss')

module.exports = class MainApp extends Root {
  start(options){
    super.start(this, options)
  }
}
  .define({
    name: 'main-app',
    template,
  })

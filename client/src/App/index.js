const template = require('./template.html')
const Root = require('hedera/routing/Root')
require('../notifications/List')
require('../modal')
require('../modeling/gameEntities')
require('../modeling/organization')
require('../main')
require('../api')
require('./style.scss')
require('./global.scss')

module.exports = class MainApp extends Root {

}
  .define({
    name: 'main-app',
    template,
  })

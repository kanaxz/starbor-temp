const template = require('./template.html')
const Root = require('hedera/Root')

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

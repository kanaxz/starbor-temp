const template = require('./template.html')
const BaseLoader = require('sools-hedera/loading/BaseLoader')
require('./style.scss')

module.exports = class Loader extends BaseLoader {

}
  .define({
    name: 'app-loader',
    template,
  })
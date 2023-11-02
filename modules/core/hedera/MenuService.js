const Service = require('hedera/Service')
const Array = require('core/types/Array')

module.exports = class MenuService extends Service {
  constructor() {
    super()
    this.links = new Array()
  }
}
  .define()
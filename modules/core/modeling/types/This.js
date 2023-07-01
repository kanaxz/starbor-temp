
const Virtual = require('./Virtual')

module.exports = class This extends Virtual {
  static getType(ownerType) {
    return ownerType
  }
}
  .define({
    name: 'This',
  })



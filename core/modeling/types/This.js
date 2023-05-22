
const Virtual = require('./Virtual')

class This extends Virtual {
  static getType(ownerType) {
    return ownerType
  }
}
This.define({
  name: 'This',
})

global.THIS = This
module.exports = This
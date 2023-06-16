const Virtual = require('./Virtual')

class Type extends Virtual {
  static build(value) {
    return value
  }

  static toJSON(value) {
    return value
  }
}


module.exports = Type

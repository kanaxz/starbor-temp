const Virtual = require('./Virtual')

module.exports = class Type extends Virtual {
  static build(value) {
    return value
  }

  static toJSON(value) {
    return value
  }
}
  .define({
    name: 'type',
  })


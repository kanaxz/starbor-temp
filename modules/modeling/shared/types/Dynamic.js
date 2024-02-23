const Virtual = require('./Virtual')

module.exports = class Dynamic extends Virtual {
  static getType(sourceType, args) {
    return this.fn(args)
  }

  static with(fn) {
    const type = class extends this { }
    type.fn = fn
    return type
  }
}
  .define({
    name: 'Dynamic',
  })



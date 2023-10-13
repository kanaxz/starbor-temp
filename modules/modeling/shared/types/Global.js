const Virtual = require('./Virtual')
const Bool = require('./Bool')
const Any = require('./Any')
const Array = require('./Array')

class Global extends Virtual {
  getType() {
    return this
  }
}

Global
  .define({
    name: 'Global',
  })
  .methods({
    and: [[{ type: Array.of(Any), spread: true }], Bool],
    or: [[{ type: Array.of(Any), spread: true }], Bool],
    if: [[Any, Any, Any], Bool]
  })

module.exports = Global
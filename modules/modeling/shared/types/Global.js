const Virtual = require('./Virtual')
const Bool = require('./Bool')
const Any = require('./Any')
const Array = require('./Array')
const Dynamic = require('./Dynamic')
const Map = require('./Map')
const Scope = require('./Scope')
const { getCommonAncestor } = require('core/utils/proto')

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
    if: [[Any, Any, Any], Dynamic.with((args) => getCommonAncestor(args[1].type, args[2].type))],
    let: [[Map.of(Any), Scope], Dynamic.with((args) => args[1].type)]
  })

module.exports = Global
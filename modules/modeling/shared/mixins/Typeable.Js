const Destroyable = require('../../mixins/Destroyable')
const mixer = require('../../mixer')
const Propertiable = require('../../mixins/Propertiable')
const Holder = require('../../mixins/Holder')
const Buildable = require('./Buildable')
const typeKey = '@type'

module.exports = mixer.mixin([Buildable], (base) => {
  return class Buildable extends base {

    parse(value, ...args) {
      if(value == null || value instanceof this){
        return value
      }
      const typeName = values['@type']
      if(typeName){
        throw new Error()
      }
      let type = this
      if (typeName && this.definition.name !== typeName) {
        type = this.findChild((c) => c.definition.name === typeName)
      }
      type.parse(values, ...args)
    }
    toJSON(...args) {
      const json = super.toJSON(...args)
      //json['@type'] = this.constructor.definition.name
      return json
    }
  }
})
require('core')
const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')

const ModelPropertiable = mixer.mixin([Propertiable], (base) => {
  return class ModelPropertiable extends base {

  }
})
  .define({
    name: 'ModelPropertiable',
  })
  .properties({
    description: 'string',
  })


class Model extends mixer.extends([ModelPropertiable]) {

}

Model
  .define({
    name: 'model',
  })
  .properties({
    _id: 'string',
  })

return
class User extends Model {

}

User
  .define({
    name: 'user',
  })
  .properties({
    lastname: 'string',
    firstname: 'string',
  })

console.log(Model.properties.beautify())
console.log(User.properties.beautify())

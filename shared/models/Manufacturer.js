const Model = require('../core/modeling/Model')

module.exports = class Manufacturer extends Model {

}
  .define({
    name: 'manufacturer',
  })
  .properties({
    nameSmall: 'string',
    name: 'string',
    description: 'string',
  })
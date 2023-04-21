const Location = require('./Location')

module.exports = class System extends Location {

}
  .define({
    name: 'system',
    pluralName: 'systems'
  })
  .properties({
    image: 'string',
  })
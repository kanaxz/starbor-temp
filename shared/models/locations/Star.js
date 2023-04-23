const Location = require('./Location')
const System = require('./System')

module.exports = class Star extends Location {

}
  .define({
    name: 'star',
    pluralName: 'stars'
  })
  .properties({
    parent: System,
  })

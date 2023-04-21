const Location = require('./Location')
const System = require('./System')

module.exports = class Star extends Location {

}
  .properties({
    parent: System,
  })
  .define({
    name: 'star',
    pluralName: 'stars'
  })
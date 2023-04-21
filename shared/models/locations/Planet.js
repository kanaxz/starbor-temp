const OrbitLocation = require('./OrbitLocation')
const System = require('./System')

module.exports = class Planet extends OrbitLocation {

}
  .properties({
    //parent: System,
  })
  .define({
    name: 'planet',
    pluralName: 'planets'
  })
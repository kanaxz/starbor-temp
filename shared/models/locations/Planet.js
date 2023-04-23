const OrbitLocation = require('./OrbitLocation')
const System = require('./System')

module.exports = class Planet extends OrbitLocation {

}
  .define({
    name: 'planet',
    pluralName: 'planets'
  })
  .properties({
    //parent: System,
  })

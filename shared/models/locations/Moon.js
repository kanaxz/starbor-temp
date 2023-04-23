const Planet = require('./Planet')
const OrbitLocation = require('./OrbitLocation')
module.exports = class Moon extends OrbitLocation {

}
  .define({
    name: 'moon',
    pluralName: 'moons'
  })
  .properties({
    parent: Planet,
  })

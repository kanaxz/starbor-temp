const Planet = require('./Planet')
const OrbitLocation = require('./OrbitLocation')
module.exports = class Moon extends OrbitLocation {

}
  .properties({
    parent: Planet,
  })
  .define({
    name: 'moon',
    pluralName: 'moons'
  })
const Real = require('./Real')
const Template = require('./Template')
const Any = require('./Any')
const template = Template.of(Any)

module.exports = class Map extends Real {

}
  .define({
    name: 'Map',
    template,
  })

const Child = require('../Child')
const template = require('./template.html')
require('./style.scss')

module.exports = class ChildChild extends Child {


}
  .define({
    name: 'child-child',
    template,
  })
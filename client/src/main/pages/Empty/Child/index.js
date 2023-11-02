const Parent = require('../Parent')
const template = require('./template.html')
require('./style.scss')

module.exports = class Child extends Parent {


}
  .define({
    name: 'child-comp',
    template,
  })
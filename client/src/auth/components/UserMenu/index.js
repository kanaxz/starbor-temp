const template = require('./template.html')
const Component = require('hedera/Component')
const auth = require('../../service')
require('./style.scss')

module.exports = class UserMenu extends Component { }
  .define({
    name: 'user-menu',
    template,
  })
  .properties({
    isOpen: 'any',
  })
  .variables({
    auth,
  })


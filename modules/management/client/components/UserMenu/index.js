const template = require('./template.html')
const Component = require('hedera/Component')
const context = require('hedera/context')
require('./style.scss')

module.exports = class UserMenu extends Component {
  constructor() {
    super()
    this.isOpen = false
  }
}
  .define({
    name: 'user-menu',
    template,
  })
  .properties({
    isOpen: 'any',
  })
  .variables({
    context,
  })
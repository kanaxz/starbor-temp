const template = require('./template.html')
const context = require('core-client/context')
const Component = require('hedera/Component')

require('./style.scss')

module.exports = class MyProfile extends Component {
  constructor() {
    super()
    this.MyDataIsOpen = false
    this.EditMyDataIsOpen = false
  }

}.define({
  name: 'myprofile-page',
  template,
})
  .properties({
    MyDataIsOpen: 'any',
    EditMyDataIsOpen: 'any',
  })
  .variables({
    context,
  })



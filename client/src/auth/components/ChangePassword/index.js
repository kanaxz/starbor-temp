const template = require('./template.html')
const Component = require('hedera/Component')
const auth = require('../../service')
require('./style.scss')

module.exports = class ChangePassword extends Component {
  constructor() {
    super()
  }

  async onSubmit() {
    console.log('sub');
  }

}
  .define({
    name: 'change-password',
    template,
  })
  .variables({
    auth,
  })
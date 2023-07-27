const template = require('./template.html')
const Component = require('hedera/Component')
const auth = require('../../service')
require('./style.scss')
const notifications = require('../../../notifications')


module.exports = class ChangePassword extends Component {
  constructor() {
    super()
    this.hasClick = false
  }

  async onSubmit() {
    console.log('sub')
    const inputs = [...this.form.querySelectorAll('input')]
    const values = inputs.reduce((acc, input) => {
      acc[input.name] = input.value
      return acc
    }, {})
    console.log(values)

    try {
      const response = await auth.changePassword(values)
      notifications.notify({ message: 'Your password has been successfully changed', type: 'success' })
      this.hasClick = false
      this.form.reset();
    }
    catch (error) {
      this.hasClick = false
      notifications.notify({ message: 'Your password is incorrect', type: 'error' })
      this.form.reset()
    }
  }

}.define({
  name: 'change-password',
  template,
})
  .variables({
    auth,
    notifications,
  })
  .properties({
    hasClick: 'any',
  })
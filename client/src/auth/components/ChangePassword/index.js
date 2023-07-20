const template = require('./template.html')
const Component = require('hedera/Component')
const auth = require('../../service')
require('./style.scss')


module.exports = class ChangePassword extends Component {
  constructor() {
    super()
    this.hasClick = false
    this.errorMessage = false
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
      console.log(response)
    }

    catch (error) {
      this.hasClick = false
      this.errorMessage = true
      this.form.reset()
    }

  }

}.define({
  name: 'change-password',
  template,
})
  .variables({
    auth,
  })
  .properties({
    hasClick: 'any',
    errorMessage: 'any',
  })
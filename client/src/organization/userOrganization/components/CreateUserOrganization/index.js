const template = require('./template.html')
const Component = require('hedera/Component')
const auth = require('../../../../auth/service')
require('./style.scss')


module.exports = class CreateUserOrganization extends Component {
  constructor() {
    super()
  }

  async onSubmit() {
    console.log("Hello")
    const inputs = [...this.form.querySelectorAll('input')]
    const values = inputs.reduce((acc, input) => {
      acc[input.name] = input.value
      return acc
    }, {})
    console.log(values)
    try {
      const response = await auth.createUserOrganization(values)
      console.log(response)
    }
    catch (error) {
      console.log('ERROR')
    }
  }

}.define({
  name: 'create-user-organization',
  template,
})
  .variables({
    auth,
  })
  .properties({

  })
const Component = require('hedera/Component')
const template = require('./template.html')
const navigator = require('@app/navigator')
const notifications = require('@app/notifications')

require('./style.scss')

module.exports = class ModelForm extends Component {
  async onSubmit(e) {
    e.preventDefault()
    const value = this.fieldset.getValue()
    console.log({ value })
    try {
      let model
      if (this.model) {
        model = await this.type.collection.update({
          _id: this.model._id,
        }, {
          $set: value
        })
      } else {
        model = await this.type.collection.create(value)
      }
      

      this.event('saved', { model })
    } catch (error) {
      console.log('error', error)
      this.event('error', { error })
      throw err
    }
  }
}
  .define({
    name: 'model-form',
    template,
  })
  .properties({
    model: 'any',
    type: 'any',
  })



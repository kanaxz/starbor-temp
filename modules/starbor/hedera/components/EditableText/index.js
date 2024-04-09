const Component = require('hedera/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class EditableText extends Component {
  edit() {
    this.editing = true
    setTimeout(() => {
      this.input.focus()
    })
  }
}
  .define({
    name: 'app-editable-text',
    template,
  })
  .properties({
    value: 'any',
    editing: 'bool',
  })

const Component = require('@core/Component')
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
  .properties({
    value: 'any',
    editing: 'bool',
  })
  .define({
    name: 'app-editable-text',
    template,
  })
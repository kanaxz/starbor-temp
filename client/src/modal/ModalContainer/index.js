const Component = require('hedera/Component')
const template = require('./template.html')

require('./style.scss')


module.exports = class ModalContainer extends Component {
  constructor() {
    super()
    if (this.constructor.instance) { throw new Error('ModalContainer already instanciated') }
    this.constructor.instance = this
  }


  show(modal) {
    this.modal = modal
  }

  close() {
    this.modal = null
  }
}
  .define({
    name: 'modal-container',
    template,
  })
  .properties({
    modal: 'any',
  })

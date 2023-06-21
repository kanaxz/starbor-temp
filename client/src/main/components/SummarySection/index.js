const Component = require('hedera/Component')
const template = require('./template.html')
require('./style.scss')


module.exports = class SummarySection extends Component {
  constructor(){
    super()
    this.open = true
  }
  initialized() {
    const title = this.querySelector('h1,h2,h3,h4,h5,h6')
    this.titleContainer.appendChild(title)
    return super.initialized()
  }
}
  .define({
    name: 'summary-section',
    template,
    transclude: true,
  })
  .properties({
    open: 'any',
  })


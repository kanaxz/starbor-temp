const Component = require('@core/Component')
const componentsService = require('./componentsService')
module.exports = class AppComponent extends Component {
  static registry(type, name) {
    componentsService.register(type, name, this)
    return this
  }
}
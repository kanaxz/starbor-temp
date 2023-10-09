const Component = require('./Component')
const Scope = require("./Scope")

module.exports = class Root extends Component {
  start(source, variables) {
    this.scope = new Scope({ source, variables })
    this.initialize()
  }
}.define({
  name: 'ui-root'
})
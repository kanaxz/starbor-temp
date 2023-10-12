const Component = require('./Component')
const Scope = require("./Scope")

module.exports = class Root extends Component {
  start(source, variables) {
    const scope = new Scope({ source, variables })
    this.process(scope)
  }
}.define({
  name: 'ui-root'
})
const Component = require('./Component')
const Scope = require("./Scope")

module.exports = class Root extends Component {
  async start(source, variables) {
    this.scope = new Scope({ source, variables })
    return await this.initialize()
  }
}.define({
  name: 'ui-root'
})
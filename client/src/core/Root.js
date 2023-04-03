const Component = require('./Component')
const Scope = require("./Scope")

module.exports = class Root extends Component {
  async start(source) {
    this.scope = new Scope({ source })
    return await this.initialize()
  }
}.define({
  name: 'ui-root'
})
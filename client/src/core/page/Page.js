const Component = require('@core/Component')

const pages = {}

module.exports = class Page extends Component {

  static register(pageName, layoutClass) {
    if (!views[pageName]) {
      this.viewName = pageName
      this.layoutClass = layoutClass
      views[pageName] = this
      return this
    } else
      throw new Error("View with name '" + pageName + "' is already registered")

  }

  static resolve(pageName) {
    return pages[pageName]
  }
}

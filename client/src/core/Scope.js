module.exports = class Scope {
  constructor({ source, parent, variables }) {
    this.parent = parent
    this.variables = {
      ...(this.parent?.variables || {}),
      ...(variables || {}),
    }
    if (source) {
      this.variables.this = source
    }
  }

  child() {
    return new Scope({
      parent: this,
    })
  }
}

module.exports = class Scope {
  constructor({ source, parent }) {
    this.parent = parent
    this.variables = {
      ...(this.parent?.variables || {}),
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


module.exports = (values) => {

}
class Proto {
  constructor(values) {
    Object.assign(this, values)
  }

  entries() {
    let entries = [Object.entries(this)]
    if (this.__proto__ instanceof this.constructor) {
      entries.push(...(this.__proto__.entries()))
    }
    return entries
  }

  keys() {
    return this.entries().map(([key]) => key)
  }

  values() {
    return this.entries().map(([, value]) => value)
  }
}
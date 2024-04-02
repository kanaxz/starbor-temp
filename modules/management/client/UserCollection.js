const Collection = require('modeling-client/Collection')

module.exports = class UserCollection extends Collection {
  async getMe() {
    const me = await this.apiRequest('/me', [])
    if (!me) { return null }

    const instance = this.type.parse(me, { singleInstance: true })
    instance.setLoadState(true)
    return instance
  }
}
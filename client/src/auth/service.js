const Service = require('hedera/Service')

const AuthService = class extends Service {
  constructor() {
    super()
    this.me = localStorage.getItem('me')
  }

  async login(payload) {
    this.me = await axios('/get/user')
    localStorage.setItem('me', this.me)
  }

  logout() {
    this.me = null
    localStorage.removeItem('me')
  }
}
  .define()
  .properties({
    me: 'any',
  })

module.exports = new AuthService()


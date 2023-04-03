const Service = require('@core/Service')

const AuthService = class extends Service {
  constructor() {
    super()
    this.me = localStorage.getItem('me')
  }

  async login(payload) {
    this.me = {}
    localStorage.setItem('me', this.me)
  }

  logout() {
    this.me = null
    localStorage.removeItem('me')
  }
}.properties({
  me: 'any',
})

module.exports = new AuthService()
const axios = require('axios')
const Service = require('hedera/Service')
const { User } = require('management')
const context = require('core-client/context')

module.exports = class AuthService extends Service {
  constructor(url) {
    super()
    this.url = url
    this.me = null
    this.on('propertyChanged:me', this.b(this.onMeChanged))
  }

  onMeChanged() {
    context.user = this.me
  }

  async request(action, payload) {
    const url = `${this.url}/api/auth${action}`
    const response = await axios({
      url,
      method: 'POST',
      data: payload,
      withCredentials: true,
    })

    return response.data
  }

  async getMe() {
    const { me } = await this.request('/me')
    this.me = User.parse(me)
  }

  async login(user) {
    const { me } = await this.request('/login', user)
    this.me = User.parse(me)
  }

  async changePassword(user) {
    const response = await this.request('/change-password', user)
    return response
  }

  async signup(user) {
    const { me } = await this.request('/signup', user)
    this.me = User.parse(me)
  }

  async logout() {
    await this.request('/logout')
    this.me = null
  }
}
  .define()
  .properties({
    me: 'any',
  })


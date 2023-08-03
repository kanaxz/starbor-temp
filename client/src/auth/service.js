const axios = require('axios')
const Service = require('hedera/Service')
const config = require('@app/config')
const api = require('@app/api')
const { User, Organization } = require('shared/types')
const Controlleable = require('../modeling/Controlleable')

const request = async (action, payload) => {
  const url = `${config.server.url}/api/auth${action}`
  const response = await axios({
    url,
    method: 'POST',
    data: payload,
    withCredentials: true,
  })

  return response.data
}
const AuthService = class extends Service {
  constructor() {
    super()
    this.me = null
    this.getMe()
  }

  async getMe() {
    const { me } = await request('/me')
    this.me = User.parse(me)
  }

  async login(user) {
    const { me } = await request('/login', user)
    this.me = User.parse(me)
  }

  async changePassword(user) {
    const response = await request('/change-password', user)
    return response
  }

  async signup(user) {
    const { me } = await request('/signup', user)
    this.me = User.parse(me)
  }

  async logout() {
    await request('/logout')
    this.me = null
  }

  async createUserOrganization(organization) {
    const response = await request('/create-user-organization', organization)
    return response
  }
}
  .define()
  .properties({
    me: 'any',
  })

const service = new AuthService()

Controlleable.auth = service
globalThis.auth = service

module.exports = service


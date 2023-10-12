const Eventable = require('../../shared/mixins/Eventable')
const mixer = require('../../shared/mixer')
const Route = require('./Route')

module.exports = class Router extends mixer.extends([Eventable]) {

  constructor() {
    super()
    this.routes = []
  }

  route(url, ...middlewares) {
    const route = new Route({
      url,
      middlewares,
    })
    this.routes.push(route)
  }

  use(...args) {
    if (args.length === 1 && args[0] instanceof Router) {
      const router = args[0]
      router.parent = this
      this.routes.push(router)
    } else {
      const route = new Route({
        middlewares: args
      })
      this.routes.push(route)
    }
  }

  async process(req, res, next = () => { }) {
    let index = 0
    const inner = async () => {
      if (index === this.routes.length) {
        return next()
      }

      const route = this.routes[index++]
      await route.process(req, res, inner)
    }
    await inner()
  }

  async execute() {
    const req = {
      url: window.location.pathname,
    }

    const res = {
      update: async () => {
        await this.execute()
      }
    }
    await this.process(req, res)
  }
}
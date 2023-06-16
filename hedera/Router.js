const Eventable = require('core/mixins/Eventable')
const mixer = require('core/mixer')
module.exports = class Router extends mixer.extends([Eventable]) {

  constructor() {
    super()
    this.routes = []
  }

  route(url, process) {
    this.routes.push({
      url,
      process,
    })
  }

  use(arg) {
    if (arg instanceof Router) {
      arg.parent = this
    } else if (typeof arg === 'function') {
      arg = {
        process: arg,
      }
    }
    this.routes.push(arg)
  }

  async process(req, res, next) {
    const inner = async (index) => {
      if (index < this.routes.lenth) {
        await next()
        return
      }
      const route = this.routes[index]
      const routeReq = {
        __proto__: req
      }
      if (route.url) {
        const match = req.url.match(route.url)
        if (!match) {
          await inner(index + 1)
          return
        }

        routeReq.match = match
      }

      await route.process(routeReq, res, async () => {
        await inner(index + 1)
      })
    }
    await inner(0)
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
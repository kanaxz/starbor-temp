const Eventable = require('@shared/core/Eventable')
const mixer = require('@shared/core/mixer')
module.exports = class Router extends mixer.extends([Eventable()]) {

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
    const routesToProcess = this.routes.filter((route) => {
      return !route.url || req.url.match(route.url)
    })

    const inner = async (index) => {
      if (index < routesToProcess.length) {
        const route = routesToProcess[index]
        await route.process(req, res, async () => {
          await inner(index + 1)
        })
      } else if (next) {
        await next()
      }
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


module.exports = class Route {
  constructor(values) {
    Object.assign(this, values)
  }

  async process(req, res, next) {
    let match
    if (this.url) {
      match = req.url.match(this.url)
      if (!match) {
        return next()
      }
    }

    const routeReq = {
      __proto__: req,
      match
    }
    let index = 0
    const inner = async () => {
      if (index === this.middlewares.length) {
        return next()
      }
      const middleware = this.middlewares[index++]
      await middleware(routeReq, res, inner)
    }
    await inner()
  }
}
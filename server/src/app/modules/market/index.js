const { market, User } = require('shared/types')

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(market, {
      async find(req, pipeline, query, next) {
        return next()
      },
      async create(req, market, next) {
        if (!req.user) {
          throw new Error('You must logged in')
        }
        market.owner = req.user
        await next()
      },
      async update(req, market, oldMarket, next) {
        if (req.user._id !== market.owner._id) {
          throw new Error()
        }

        await next()
      },
      async delete(req, market, next) {
        if (req.user._id !== market.owner._id) {
          throw new Error()
        }
        await next()
        await modeling.collections.marketItems.deleteMany(req, {
          'market._id': market._id,
        })
      }
    })
  }
}
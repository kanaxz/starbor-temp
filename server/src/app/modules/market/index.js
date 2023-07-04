const { market, User } = require('shared/types')

module.exports = {
    dependancies: ['modeling'],
    async construct({modeling}) {

        modeling.controller(market, {
            async find(req, pipeline, query, next) {
                return next()
            },
            async create(req, user, next) {
                await next()
            },
            
        })
    }
}
const { match } = require('../processing')
const Models = require('./Models')
const mixer = require('core/mixer')
const setup = require('../setup')

module.exports = class QueryResult extends mixer.extends(Models,[...setup.queryResult.before]) {
  constructor(values, queryParams) {
    if (!queryParams) {
      return []
    }
    super(...values)
    this.queryParams = queryParams
  }

  async checkModel(...args) {
    const [context, model] = setup.getArgs(args)
    const isInsanceOfTemplate = model instanceof this.constructor.definition.template
    if (!isInsanceOfTemplate) { return }
    let index = this.indexOf(model)
    if (await match(context, model, this.queryParams.stages)) {
      if (index === -1) {
        this.push(model)
      }
    } else {
      if (index !== -1) {
        this.splice(index, 1)
      }
    }
  }

  toJSON(paths, context) {
    if(paths === undefined){
      paths = this.queryParams.options.load
    }
    return super.toJSON(paths, context)
  }
}
  .define()

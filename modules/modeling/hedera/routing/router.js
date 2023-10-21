const mixer = require('core/mixer')
const Pageable = require('modeling/mixins/Pageable')
const { Model } = require("modeling/types")
const LayoutRouter = require('hedera/routing/routers/LayoutRouter')
const { actions } = require('./setup')

const types = Model.getAllChilds()
  .filter((t) => mixer.is(t.prototype, Pageable))
  .filter((t) => !t.definition.abstract)

const url = new RegExp(`/(${types.map((t) => t.definition.name).join('|')})/([\\d|\\w]*)`)

const router = new LayoutRouter({
  url,
  layout: (req) => [import('./ModelLayout'), { model: req.model }]
})

router.use(async (req, res, next) => {
  const typeName = req.match[1]
  const code = req.match[2]
  const type = types.find((t) => t.definition.name === typeName)
  const { codeField } = type.definitions.find((d) => d.codeField)
  const model = await type.buildAndLoad({
    [codeField]: code,
  })
  Object.assign(req, {
    type,
    model
  })
  return next()
})


actions
  .filter((action) => action.url !== undefined)
  .forEach((action) => {
    router.route(action.url, async (req, res, next) => {
      if (action.check && !await action.check(req.model)) {
        return next()
      }

      await action.execute(req, res, next)
    })
  })

module.exports = router
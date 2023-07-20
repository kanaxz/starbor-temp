const navigator = require('@app/navigator')
const { GameEntity, Entity } = require('shared/types')

const childs = GameEntity
  .getAllChilds()
  .filter((c) => !c.definition.abstract)

const childsNames = childs.map((m) => m.definition.name)

const editRegex = new RegExp(`/(${childsNames.join('|')})/(.*)/edit`)

navigator.route(editRegex, async (req, res) => {
  const entityName = req.match[1]
  const code = req.match[2]
  const entityType = childs.find((c) => c.definition.name === entityName)
  const entity = entityType.parse({
    code,
  })

  await entity.load()
  await res.page(import('./Edit'), { entity })
})

const showRegex = new RegExp(`/(${childsNames.join('|')})/(.*)`)

navigator.route(showRegex, async (req, res) => {
  const entityName = req.match[1]
  const code = req.match[2]
  const entityType = childs.find((c) => c.definition.name === entityName)
  const entity = entityType.parse({
    code,
  })

  await entity.load()
  await res.page(import('./Show'), { entity })
})

navigator.route(/\/entities$/, async (req, res) => {
  await res.page(import('./Entities'))
})

navigator.route(/\/entities\/create/, async (req, res) => {
  await res.page(import('./Create'))
})
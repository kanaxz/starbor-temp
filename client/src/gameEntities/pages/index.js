const navigator = require('@app/navigator')
const { GameEntity, Entity } = require('shared/types')

const childs = GameEntity
  .getAllChilds()
  .filter((c) => !c.definition.abstract)

const childsNames = childs.map((m) => m.definition.name)
const showRegex = new RegExp(`/(${childsNames.join('|')})/(.*)`)

navigator.route(showRegex, async (req, res) => {
  const entityName = req.match[1]
  const code = req.match[2]
  const entityType = childs.find((c) => c.definition.name === entityName)
  const entity = new entityType({
    code,
  })

  console.log("PAGE", entity)

  await entity.load()
  await res.page(import('./Show'), { entity })
})

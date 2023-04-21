const { path } = require('./utils')
const glob = require('glob')
const { getFileRoot, nullRef } = require('../utils')
const { join } = require('path')

module.exports = async (services) => {
  const { db, labels } = services
  const types = require('./types')(services)

  const files = [
    ...(await glob(join(path, 'system/stanton/**/*.xml'))),
    ...(await glob(join(path, 'station/**/*.xml'))),
    ...(await glob(join(path, '*.xml'))),
  ]

  const items = files.map((file) => {
    const [className, json] = getFileRoot(file)
    const name = labels.get(json.name)
    const description = labels.getDescription(json.description)

    return {
      starcitizen: {
        id: json.__ref,
        className,
        parentId: json.parent === nullRef ? null : json.parent,
        type: json.type,
        name,
        description,
      },
      childs: [],
      name,
      description,
      json
    }
  })

  for (const item of items) {
    const parent = items.find((i) => i.starcitizen.id === item.starcitizen.parentId)
    if (parent) {
      item.parent = parent
      parent.childs.push(item)
    }
  }

  const treeItems = items.filter((item) => !item.starcitizen.parentId)

  const processChilds = async (childs) => {
    for (const item of childs) {
      const type = Object.values(types).find((t) => t.ref === item.starcitizen.type)
      if (!type) {
        continue
      }

      await type.process(item)
      await processChilds(item.childs)
    }
  }

  await processChilds(treeItems)

}
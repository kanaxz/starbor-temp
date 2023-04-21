const config = require('../../../config')
const glob = require('glob')
const { getFileRoot } = require('../utils')
const { join } = require('path')
const path = join(config.dataPath, 'Libs/Foundry/Records/mining/mineableelements')
const { collectionLoader } = require('../loader')

module.exports = async ({ labels, db }) => {
  const files = await glob(join(path, '*.xml'))

  const entries = files
    .map((file) => {
      const [className, json] = getFileRoot(file)
      return {
        '@type': 'mineableResource',
        starcitizen: {
          id: json.__ref,
          className,
        },
        name: json.mineableResource,
      }
    })

  await collectionLoader('items', entries, db)
  return {
    entries,
  }
}
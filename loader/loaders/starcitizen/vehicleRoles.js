const config = require('../../config')
const glob = require('glob')
const { getFileRoot } = require('./utils')
const { join } = require('path')
const path = join(config.dataPath, 'Libs/Foundry/Records/vehicle/roles')
const { collectionLoader } = require('./loader')

module.exports = async ({ labels, db }) => {
  const files = await glob(join(path, '*.xml'))

  const entries = files
    .map((file) => {
      const [className, json] = getFileRoot(file)
      const name = labels.get(json.displayName)
      return {
        starcitizen: {
          id: json.__ref,
          className,
        },
        name,
      }
    })

  const getIdentity = (starcitizenId) => {
    const object = entries.find((m) => m.starcitizen.id === id)
    return object?.name
  }

  await collectionLoader('vehicleRoles', entries, db)
  return {
    entries,
    getIdentity,
  }
}
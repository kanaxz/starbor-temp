const config = require('../../config')
const glob = require('glob')
const { getFileRoot } = require('./utils')
const { join } = require('path')
const path = join(config.dataPath, 'Libs/Foundry/Records/scitemmanufacturer')
const { collectionLoader } = require('./loader')
const Types = ['armor', 'clothes', 'personalweapons']

module.exports = async (services) => {
  const { labels, db } = services
  const filesByTypes = {
    general: await glob(join(path, 'scitemmanufacturer.*.xml')),
  }

  for (const type of Types) {
    filesByTypes[type] = await glob(join(path, `${type}/scitemmanufacturer.*.xml`))
  }

  const entries = Object.entries(filesByTypes)
    .flatMap(([type, files]) => {
      return files.map((file) => {
        const [className, json] = getFileRoot(file)
        const code = json.Code
        const name = labels.get(json.Localization.Name)
        const description = labels.getDescription(json.Localization.Description)
        return {
          starcitizen: {
            id: json.__ref,
            className,
          },
          type,
          code,
          name,
          description,
        }
      })
    })

  const getCode = (id) => {
    const manufacturer = entries.find((m) => m.starcitizen.id === id)
    return manufacturer?.code
  }

  await collectionLoader('manufacturers', entries, db)
  services.manufacturers = {
    entries,
    getCode,
  }
}
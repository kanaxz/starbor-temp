const config = require('../../../../config')
const { join } = require('path')
const fs = require('fs')
const { getFileRoot } = require('../../utils')
const { collectionLoader } = require('../../loader')

const portItemCollectionLoader = async (type, fileName, { items, labels, manufacturers, db }) => {
  const path = join(config.dataPath, `Libs/Foundry/Records/entities/scitem/${fileName}`)
  const files = fs.readdirSync(path)

  const entries = files
    .map((file) => {
      //const fileContent = fs.readFileSync(join(path, file), 'utf-8')
      const [className, json] = getFileRoot(join(path, file))
      const def = json.Components.SAttachableComponentParams.AttachDef
      console.log(def.Manufacturer)
      const manufacturer = manufacturers.getCode(def.Manufacturer)

      return {
        starcitizen: {
          id: json.__ref,
          description: labels.getDescription(def.Localization.Description),
          className,
        },
        '@type': type,
        manufacturer,
        size: parseInt(def.Size),
        grade: parseInt(def.Grade),
        name: labels.get(def.Localization.Name),
      }
    })

  await collectionLoader('items', entries, db)
  items.push(...entries)
}

module.exports = {
  portItemCollectionLoader
}
const config = require('../../config')
const { getFileRoot, parseBool } = require('./utils')
const { join } = require('path')
const { collectionLoader } = require('./loader')
const fs = require('fs')

const path = join(config.dataPath, 'Libs/Foundry/Records/lawsystem/infractiondefinitions')


module.exports = async ({ labels, db }) => {

  const folders = fs.readdirSync(path)
  const entries = folders.flatMap((folderName) => {
    const folderPath = join(path, folderName)
    const filePaths = fs.readdirSync(folderPath)
    return filePaths.map((fileName) => {
      const filePath = join(folderPath, fileName)
      const [className, json] = getFileRoot(filePath)
      const name = labels.get(json.name)
      const description = labels.getDescrition(json.description)
      const params = json.defaultParameters
      return {
        starcitizen: {
          id: json.__ref,
          className,
        },
        type: folderName,
        name,
        description,
        ignoreIfAgainstPartyMember: parseBool(params.ignoreIfAgainstPartyMember),
        felonyMerits: parseInt(params.felonyMerits)
      }
    })

  })

  await collectionLoader('infractions', entries, db)
  return {
    entries,
  }
}
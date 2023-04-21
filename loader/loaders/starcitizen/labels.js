const config = require('../../config')
const { join } = require('path')
const fs = require('fs')
const path = join(config.dataPath, 'Localization/english/global.ini')
const ini = require('ini')

module.exports = async (services) => {
  const fileContent = fs.readFileSync(path, 'utf-8')
  const labels = ini.parse(fileContent)
  const get = (key) => {
    key = key.replace('@', '')
    return labels[key]
  }

  const getDescription = (key) => {
    const description = get(key)
    return description.split('\\n').pop()
  }
  services.labels = {
    get,
    getDescription
  }
}
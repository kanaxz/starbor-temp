
const ignores = [
  'LEVSKI', '_OLD', 'PYRO', 'TEST',
]

module.exports = (services) => {
  const utils = require('./utils')(services)

  const shouldIgnore = ({ Name }) => {
    for (const ignore of ignores) {
      if (Name.toUpperCase().includes(ignore)) {
        return true
      }
    }
    return false
  }

  const parsers = {
    hardcodedShops: require('./hardCodedServices')(services, utils),
    landingServices: require('./landingServices')(services, utils),
    adminOffices: require('./adminOffices')(services, utils),
    basicShopTypes: require('./basicShopsTypes')(services, utils),
    hospitals: require('./hospitals')(services, utils),
    spaceports: require('./spacePorts')(services, utils)
  }

  const parse = async (shopJson, parent) => {
    if (shouldIgnore(shopJson)) { return null }
    for (const parser of Object.values(parsers)) {
      const result = await parser(shopJson, parent)
      if (result) {
        return result
      }
    }
    return null
  }

  return {
    parse,
    parsers,
  }
}
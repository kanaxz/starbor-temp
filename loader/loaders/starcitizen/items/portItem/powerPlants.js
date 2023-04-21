const { portItemCollectionLoader } = require('./utils')

module.exports = async (services) => {
  return portItemCollectionLoader('powerPlant', 'ships/powerplant', services)
}
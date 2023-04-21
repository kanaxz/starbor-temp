const { portItemCollectionLoader } = require('./utils')

module.exports = async (services) => {
  return portItemCollectionLoader('quantumDrive', 'ships/quantumdrive', services)
}
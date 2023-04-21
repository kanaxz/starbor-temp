const { portItemCollectionLoader } = require('./utils')

module.exports = async (services) => {
  return portItemCollectionLoader('coolers', 'ships/cooler', services)
}
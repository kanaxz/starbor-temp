
const itemLoaders = [
  require('./portItem'),
  require('./mineableRessources'),
  require('./ships'),
]

module.exports = async (services) => {
  services.items = []
  for (const itemLoader of itemLoaders) {
    await itemLoader(services)
  }
}
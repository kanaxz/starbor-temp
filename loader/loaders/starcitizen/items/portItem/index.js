
const itemLoaders = [
  require('./powerPlants'),
  require('./quantumDrives'),
  require('./coolers')
]

module.exports = async (services) => {
  services.items = []
  for (const itemLoader of itemLoaders) {
    await itemLoader(services)
  }
}
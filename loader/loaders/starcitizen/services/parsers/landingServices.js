const restore = {
  repair: 'HPMC',
  refuel: 'PlasmaFuel',
  quantumRefuel: 'QuantumFuel',
}

const prefix = 'LandingServices_'

module.exports = ({ services }, utils) => {
  return async (serviceJson) => {
    if (!serviceJson.Name.startsWith(prefix)) { return false }
    const locationName = serviceJson.Name.replace(prefix, '')
    const location = await utils.findLocation(locationName)
    if (!location) { return }

    await services.save({
      '@type': 'landingService',
      name: `Landing Service, ${location.name}`,
      parent: {
        _id: location._id,
      },
    })

    return true
  }
}
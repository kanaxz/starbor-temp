
const prefix = 'AdminOffice_'

module.exports = ({ services, locations }, utils) => {
  return async (serviceJson) => {
    if (!serviceJson.Name.startsWith(prefix)) { return false }
    const locationName = serviceJson.Name.replace(prefix, '')
    const location = await utils.findLocation(locationName)
    if (!location) { return }

    const adminOffice = await locations.save({
      '@type': 'stand',
      name: `Admin Office, ${location.name}`,
      parent: {
        _id: location._id,
      },
    }, true)

    const tradingConsole = await services.save({
      '@type': 'tradingConsole',
      name: `Trading console, ${adminOffice.name}`,
      parent: {
        _id: adminOffice._id,
      },
    })

    await services.save({
      '@type': 'relay',
      name: `Relay, ${adminOffice.name}`,
      parent: {
        _id: adminOffice._id
      },
    })

    await services.processInventary(serviceJson, tradingConsole)
    return true
  }
}

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
      parent: location._id,
    }, true)

    const tradingConsole = await services.save({
      '@type': 'tradingConsole',
      name: `Trading console, ${adminOffice.name}`,
      parent: adminOffice._id,
    })

    await services.save({
      '@type': 'relay',
      name: `Relay, ${adminOffice.name}`,
      parent: adminOffice._id,
    })

    await services.processInventary(serviceJson, tradingConsole)
    return true
  }
}

module.exports = ({ services, locations }) => {
  return async (serviceJson) => {
    if (!serviceJson.Name.endsWith('_Spaceport')) { return false }
    const splitCityName = serviceJson.Name.replace('_Spaceport', '').split(/(?=[A-Z])/)
    const cityId = splitCityName.map((s) => s.toUpperCase()).join('-')
    const cityName = splitCityName.join(' ')

    const spacePort = await locations.save({
      '@type': 'complex',
      complexType: 'spaceport',
      name: `Spaceport, ${cityName}`,
      parent: {
        _id: cityId,
      },
    }, true)

    const shop = await services.save({
      '@type': 'shop',
      name: `Shop, ${spacePort.name}`,
      parent: {
        _id: spacePort._id,
      },
    })

    await services.save({
      '@type': 'landingService',
      name: `Landing service, ${spacePort.name}`,
      parent: {
        _id: spacePort._id,
      },
    })

    await services.processInventary(serviceJson, shop)
    return true
  }
}
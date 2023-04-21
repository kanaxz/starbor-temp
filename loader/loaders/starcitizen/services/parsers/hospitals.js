
const hospitals = {
  A18: {
    name: 'Hospital, Area18',
    parent: 'AREA18'
  },
  NewBab: {
    name: 'Hospital, New Babbage',
    parent: 'NEW-BABBAGE'
  },
  Orison: {
    name: 'Hostpital, Orison',
    parent: 'ORISON',
  },
  MPOH: {
    name: 'Maria Pure of Heart',
    parent: 'LOREVILLE',
  },
}

module.exports = ({ db, services, locations }) => {
  return async (serviceJson) => {
    if (!serviceJson.Name.endsWith('_Hospital')) { return null }
    const hospitalCode = serviceJson.Name.replace('_Hospital', '')

    const hospital = await locations.save({
      '@type': 'complex',
      complexType: 'hospital',
      ...(hospitals[hospitalCode]),
    }, true)

    await services.save({
      '@type': 'healthCare',
      name: `Health care, ${hospital.name}`,
      tier: 1,
      parent: hospital._id,
    })

    const shop = await services.save({
      '@type': 'shop',
      name: `Pharmacy, ${hospital.name}`,
      parent: hospital._id,
    })

    await services.processInventary(serviceJson, shop)
  }
}
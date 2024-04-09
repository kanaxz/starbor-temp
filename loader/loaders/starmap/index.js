const { starmapRequest } = require('./utils')
const systemsLoader = require('./systems')
const { Organization } = require('../../../modules/starbor/shared/types')
const { codify } = require('../../utils')

module.exports = async (services) => {
  const bootup = await starmapRequest('bootup')
  //console.log(Object.keys(bootup), bootup.config)

  const loadAffiliations = async () => {
    for (const starmapObject of bootup.affiliations.resultset) {
      const code = codify(starmapObject.code)
      const organization = Organization.parse({
        code,
        name: starmapObject.name,
        color: starmapObject.color,
        wiki: starmapObject.name,
      })

      await Organization.collection.create(organization)
    }
  }

  const loadSpecies = async () => {
    for (const starmapSpecies of bootup.species.resultset) {
      const code = codify(starmapSpecies.name)
      const organization = Organization.parse({
        code,
        type: 'species',
        name: starmapSpecies.name,
        color: null,
      })

      await Organization.collection.create(organization)
    }
  }
  
  await loadAffiliations()
  //await loadSpecies()
  /**/
  await systemsLoader(bootup, services)
}
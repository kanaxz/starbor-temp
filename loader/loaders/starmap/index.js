const { starmapRequest } = require('./utils')
const systemsLoader = require('./systems')
const { Starmap, Organization } = require('shared/types')
const { codify } = require('../../utils')

module.exports = async (services) => {
  const bootup = await starmapRequest('bootup')
  //console.log(Object.keys(bootup), bootup.config)
  const { collections } = services

  const loadAffiliations = async () => {
    for (const starmapObject of bootup.affiliations.resultset) {
      console.log(JSON.stringify(starmapObject, null, ' '))
      process.exit()
      const code = codify(starmapObject.code)
      const organization = Organization.parse({
        code,
        name: starmapObject.name,
        color: starmapObject.color,
        starmap: new Starmap({
          type: 'affiliation',
          id: starmapObject.id
        })
      })

      await collections.organizations.createOrUpdate(organization)
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
        starmap: new Starmap({
          id: starmapSpecies.id,
          type: 'species',
        })
      })

      await collections.organizations.createOrUpdate(organization)
    }
  }
  
  await loadAffiliations()
  await loadSpecies()
  /**/
  //await systemsLoader(bootup, services)
}
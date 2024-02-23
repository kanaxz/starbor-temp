module.exports = {
  dependancies: ['core', 'modeling'],
  async construct({ core, modeling }) {
    // DEBUGTESTDEBUGTEST
    return
    core.onReady(async (req) => {
      const { collections } = modeling
      console.log(collections)
      const load = { }
      const objects = await collections.storage.find(req, [],  {
        load
      })

      console.log("objects", JSON.stringify(objects.map((o) => o.toJSON(load)), null, ' '))
      process.exit()
    })

  }
}
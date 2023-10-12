
module.exports = {
  dependancies: ['processing'],
  async construct({ processing }) {
    const { collections } = processing
    return
    const req = {}
    const load = { memberships: { group: true } }
    const user = await collections.users.findOne(req, [],)
    await user.load(req, load)
    console.log("user", JSON.stringify(user.toJSON({
      memberships: {
        group: true
      }
    }), null, ' '))
    process.exit()
  }
}
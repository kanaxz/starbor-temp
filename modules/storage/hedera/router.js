const Router = require('hedera/routing/routers/Router')
const Folder = require('storage/Folder')

const router = new Router()

router.route('/explorer', async (req, res) => {
  const storageFolder = await Folder.collection.findOne({
    path: '/storage',
  })
  res.page(import('./StoragePage'), storageFolder)
})

module.exports = router
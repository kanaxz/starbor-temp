const Router = require('hedera/routing/routers/Router')
const Folder = require('storage/Folder')

const router = new Router()

router.route(/\/explorer(.+)/, async (req, res) => {
  const [, _id] = req.match
  const storageFolder = await Folder.collection.findByUniqueIndex({
    _id,
  })
  res.page(import('./StoragePage'), storageFolder)
})

module.exports = router
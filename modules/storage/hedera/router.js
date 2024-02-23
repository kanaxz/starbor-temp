const Router = require('hedera/routing/routers/Router')
const Folder = require('storage/Folder')

const router = new Router()

router.route(/\/explorer(.+)/, async (req, res) => {
  const [, path] = req.match
  const storageFolder = await Folder.collection.findByUniqueIndex({
    path: decodeURI(path),
  })
  res.page(import('./StoragePage'), storageFolder)
})

module.exports = router
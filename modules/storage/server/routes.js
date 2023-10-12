const { File, Access, Folder } = require('storage')
const { rootPath, uploadPath } = require('./utils')
const { join } = require('path')
const fileUpload = require('express-fileupload')
const fs = require('fs').promises
const { handleError } = require('core-server/errors')

module.exports = ({ express, config }) => {
  express.get(`${rootPath}/*`, async (req, res) => {
    const path = req.originalUrl
    const file = await File.collection.findOne(req, [{
      $eq: ['$path', path]
    }])

    if (!file) {
      res.status(404)
        .send({
          error: 'Not found'
        })
      return
    }

    const fullPath = join(config.root, path)
    console.log('sending file', { path, fullPath })

    res.sendFile(fullPath)
  })

  const upload = fileUpload({
    useTempFiles: true,
    tempFileDir: join(config.root, uploadPath)
  })

  express.post(`/api/upload/file`, upload, async (req, res) => {
    console.log('file upload')
    try {
      const f = req.files.file
      if (!f) {
        throw new Error('File is missing')
      }
      const folder = await Folder.collection.findOne(req, [{ $eq: ['$path', uploadPath] }])
      if (!folder) {
        throw new Error('Upload folder missing')
      }


      const file = await File.collection.create({
        ...req,
        fromUploadAPI: true,
      }, {
        '@type': req.body.type,
        name: f.name,
        type: f.mimetype,
        parent: folder,
        size: f.size,
        access: new Access({
          read: 'owner',
          edit: 'owner',
        })
      })
      await fs.rename(f.tempFilePath, join(config.root, file.path))
      return res.status(200)
        .json(file.toJSON())
    } catch (err) {
      handleError(res, err)
    }
  })
}
const fs = require('fs')
const { File, Access, Folder, Image } = require('storage')
const { rootPath, uploadPath } = require('./utils')
const { join, basename } = require('path')
const fileUpload = require('express-fileupload')
const { handleError } = require('core-server/errors')
const { rename, stat } = require("fs/promises")
const { Readable } = require('stream')
const { finished } = require('stream/promises')
const { makeId } = require('core/utils/string')
const util = require('util')
const mmm = require('mmmagic')
const { validateType } = require('core/utils/file')
Magic = mmm.Magic
const magic = new Magic(mmm.MAGIC_MIME_TYPE)

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

  const fullUploadPath = join(config.root, uploadPath)

  const upload = fileUpload({
    useTempFiles: true,
    tempFileDir: fullUploadPath
  })

  const createFileFromPath = async (req, path, values) => {
    const folder = await Folder.collection.findOne(req, [{ $eq: ['$path', uploadPath] }])
    if (!folder) {
      throw new Error('Upload folder missing')
    }

    req.fromUploadAPI = true
    const mimetype = await (util.promisify((path, callback) => magic.detectFile(path, callback)))(path)
    const fileStat = await stat(path)

    const type = File.getAllChilds()
      .reverse()
      .find((t) => validateType(t.accept, mimetype))
      .definition.name

    const file = await File.collection.create(req, {
      '@type': type,
      mimetype,
      folder,
      ...values,
      size: fileStat.size,
      access: new Access({
        read: 'owner',
        edit: 'owner',
      })
    })


    await rename(path, join(config.root, file.path))
    return file
  }

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

      const file = await createFileFromPath(req, f.tempFilePath, {
        name: f.name,
        source: 'upload',
      })
      return res.status(200)
        .json(file.toJSON())
    } catch (err) {
      handleError(res, err)
    }
  })

  express.post('/api/upload/url', async (req, res) => {
    try {
      const fileUrl = req.body.url
      if (!fileUrl) {
        throw new Error('File url missing')
      }
      const filePath = join(fullUploadPath, makeId())
      const fileName = basename(fileUrl)
      const fetchRes = await fetch(fileUrl)
      const fileStream = fs.createWriteStream(filePath, { flags: 'wx' });
      await finished(Readable.fromWeb(fetchRes.body).pipe(fileStream))
      const file = await createFileFromPath(req, filePath, {
        name: fileName,
        source: fileUrl
      })

      return res.status(200)
        .json(file.toJSON())
    } catch (err) {
      handleError(res, err)
    }
  })
}
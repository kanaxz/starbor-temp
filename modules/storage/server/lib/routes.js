const fs = require('fs')
const { File, Folder } = require('storage')
const { uploadName, storageName } = require('../utils')
const { join, basename } = require('path')
const fileUpload = require('express-fileupload')
const { handleError } = require('core-server/errors')
const { rename, stat, readFile, mkdir } = require("fs/promises")
const { Readable } = require('stream')
const { finished } = require('stream/promises')
const { makeId } = require('core/utils/string')
const util = require('util')
const mmm = require('mmmagic')
const { validateType } = require('core/utils/file')
Magic = mmm.Magic
const magic = new Magic(mmm.MAGIC_MIME_TYPE)
const sharp = require('sharp')
const Right = require('ressourcing/Right')
const maxImageSize = 5000

const types = {
  image: {
    readFile: async (req, file, config) => {
      const filePath = join(config.root, storageName, file._id)

      if (!req.query.width || !req.query.height) {
        return readFile(filePath)
      }

      const width = parseInt(req.query.width)
      const height = parseInt(req.query.height)

      for (const d of [width, height]) {
        if (!d || isNaN(d)) {
          throw new Error('Size not recognized')
        }
        if (d > maxImageSize) {
          throw new Error(`Size to big, max is ${maxImageSize}`)
        }
      }


      const folderPath = join(config.root, 'cache', file._id)
      if (!fs.existsSync(folderPath)) {
        await mkdir(folderPath, { recursive: true })
      }

      const resizedImagePath = join(folderPath, `w${width}-h${height}`)

      if (!fs.existsSync(resizedImagePath)) {
        await sharp(filePath)
          .resize(width, height)
          .toFile(resizedImagePath)
      }

      return readFile(resizedImagePath)
    }
  }
}

module.exports = ({ express }, config) => {
  express.get(`/api/${storageName}/:id`, async (req, res) => {
    try {
      const file = await File.collection.findOne(req, [{
        $eq: ['$_id', req.params.id]
      }, {
        $is: ['$this', 'file']
      }])

      if (!file) {
        res.status(404)
          .send({
            error: 'Not found'
          })
        return
      }


      res.setHeader('Content-Type', file.mimetype)
      const typeName = file.constructor.definition.name
      const type = types[typeName]
      let data
      if (type?.readFile) {
        data = await type.readFile(req, file, config)
      } else {
        const fullPath = join(config.root, path)
        data = await readFile(fullPath)
      }

      res.send(data)
    } catch (err) {
      handleError(res, err)
    }
  })
  const fullUploadPath = join(config.root, uploadName)

  const upload = fileUpload({
    useTempFiles: true,
    tempFileDir: fullUploadPath
  })

  const createFileFromPath = async (req, path, values) => {
    if (!req.user) {
      throw new Error('Must be connected')
    }

    req.fromUploadAPI = true
    const mimetype = await (util.promisify((p, callback) => magic.detectFile(p, callback)))(path)
    const fileStat = await stat(path)

    const type = File.getAllChilds()
      .reverse()
      .find((t) => validateType(t.accept, mimetype))
      .definition.name

    const file = await File.collection.create(req, {
      ...values,
      '@type': type,
      mimetype,
      size: fileStat.size,
      read: new Right({
        type: 'inherited'
      }),
      edit: new Right({
        type: 'inherited'
      })
    })
    const destFolder = join(config.root, storageName)
    if (!fs.existsSync(destFolder)) {
      await mkdir(destFolder, { recursive: true })
    }
    const dest = join(destFolder, file._id)
    await rename(path, dest)
    return file
  }

  express.post(`/api/upload/file`, upload, async (req, res) => {
    try {
      const f = req.files.file
      if (!f) {
        throw new Error('File is missing')
      }


      const name = Buffer.from(f.name, 'ascii').toString()
      const values = JSON.parse(req.body.values)
      const file = await createFileFromPath(req, f.tempFilePath, {
        ...values,
        name,
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
      const fileValues = req.body.file
      if (!fileUrl) {
        throw new Error('File url missing')
      }

      if (!fs.existsSync(fullUploadPath)) {
        await mkdir(fullUploadPath, { recursive: true })
      }
      const filePath = join(fullUploadPath, makeId())
      const fileName = basename(fileUrl)
      const fetchRes = await fetch(fileUrl)
      const fileStream = fs.createWriteStream(filePath, { flags: 'wx' })
      await finished(Readable.fromWeb(fetchRes.body).pipe(fileStream))
      const file = await createFileFromPath(req, filePath, {
        ...fileValues,
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
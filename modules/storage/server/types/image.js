const maxImageSize = 5000
const sharp = require('sharp')
const { readFile, mkdir } = require('fs/promises')
const fs = require('fs')
const { join } = require('path')
const { uploadName, storageName } = require('../utils')

module.exports = {
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
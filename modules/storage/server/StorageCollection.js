const { join } = require("path");
const MongoCollection = require('mongo/MongoCollection');
const { objectToFilter } = require('modeling/processing/utils')
const fs = require('fs').promises

module.exports = class StorageCollection extends MongoCollection {
  constructor(type, mongo, controllers, config) {
    super(type, mongo, controllers)
    this.config = config
  }
  async move(req, file, folder, values = {}) {
    console.log('moving', file.toJSON(), folder.toJSON())
    const { root } = this.config
    await file.load(req, {
      folder: true
    })
    if (file.folder.equals(folder) || file.folder.path === '/storage/upload') {
      console.log(1)
      const fileId = file.getIndex('id')
      console.log({ fileId })
      return await this.update(req, objectToFilter(fileId), {
        $set: {
          folder,
          ...values
        }
      })
    } else {
      console.log(2)
      const copy = file.constructor.parse(file.toJSON())
      Object.assign(copy, {
        _id: null,
        owner: null,
        group: null
      })
      const newPath = '/storage/upload'
      await fs.copyFile(join(root, file.path), join(root, newPath))
      Object.assign(copy, {
        folder,
        path: newPath,
        ...values
      })
      await this.create(req, copy)
      return copy
    }
  }
}
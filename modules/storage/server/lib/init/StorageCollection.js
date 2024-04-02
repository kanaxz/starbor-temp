const { join } = require("path");
const MongoCollection = require('mongo/MongoCollection');
const { objectToFilter } = require('modeling/processing/utils');
const { storageName } = require("../../utils");
const fs = require('fs').promises

module.exports = class StorageCollection extends MongoCollection {

  static methods = [
    ...MongoCollection.methods,
    'getByPath'
  ]

  constructor(type, mongo, controllers, config) {
    super(type, mongo, controllers)
    this.config = config
  }

  async move(context, file, folder, values = {}) {

    const { root } = this.config
    await file.load(context, {
      folder: true
    })
    if (file.folder.equals(folder) || file.folder.path === '/storage/upload') {
      await file.apply(context, {
        ...values,
        folder,
      })

      return file
    } else {
      const copy = file.constructor.parse(file.toJSON())
      copy._id = null

      Object.assign(copy, {
        ...values,
        folder,
      })
      const { fromUploadAPI } = context
      context.fromUploadAPI = true
      await this.create(context, copy)
      Object.assign(context, { fromUploadAPI })
      await fs.copyFile(join(root, storageName, file._id), join(root, storageName, copy._id))
      return copy
    }


  }

  async getByPath(context, path) {
    const segments = path.split('/').filter((o) => o)
    let current = null

    for (const segment of segments) {
      current = await this.findOne(context, [{
        $eq: ['$name', segment]
      }, {
        $eq: ['$folder', current?.getIndex('id')]
      }])
    }

    return current
  }
}
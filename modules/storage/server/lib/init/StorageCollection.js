const { join } = require("path");
const MongoCollection = require('mongo/MongoCollection');
const { objectToFilter } = require('modeling/processing/utils');
const { storageName } = require("../../utils");
const { copyFile } = require('fs/promises')

module.exports = class StorageCollection extends MongoCollection {


  constructor(type, mongo, controllers, config) {
    super(type, mongo, controllers)
    this.config = config
  }

  async move(context, file, folder, values = {}) {

    const { root } = this.config
    await file.load(context, {
      folder: true
    })
    const userUploadFolder = await context.user.folder.getByPath(context, '/private/upload')
    if (file.folder.equals(folder) || file.folder.equals(userUploadFolder)) {
      await file.apply(context, {
        ...values,
        folder: folder.toJSON(null),
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
      await copyFile(join(root, storageName, file._id), join(root, storageName, copy._id))
      return copy
    }


  }
}
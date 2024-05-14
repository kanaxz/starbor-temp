const Collection = require('modeling-client/Collection')
const File = require('storage/File')


module.exports = class StorageCollection extends Collection {

  async upload(file, fileObject, options = {}) {
    if (fileObject) {
      if (!(fileObject instanceof File)) {
        fileObject = new File(fileObject)
      }
    }
    const formData = new FormData()
    formData.append('file', file)
    if (fileObject) {
      formData.append('values', JSON.stringify(fileObject.toJSON()))
    }

    const url = `${this.url}/api/upload/file`

    const result = await this.request({
      url,
      method: 'POST',
      data: formData,
      onUploadProgress: options.onUploadProgress,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })

    const object = this.type.parse(result, { singleInstance: true })
    object.setLoadState(true)
    console.log(object.toJSON())
    await this.onModelCreated(object)
    return object
  }

  async uploadUrl(url, file) {
    const result = await this.request({
      url: `${this.url}/api/upload/url`,
      method: 'POST',
      data: {
        url,
        file,
      },
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const object = this.type.parse(result, { singleInstance: true })
    object.setLoadState(true)
    return object
  }
}
const Collection = require('processing-client/Collection')

module.exports = class FileCollection extends Collection {
  async upload(file, type, options = {}) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type.definition.name)
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

    const object = this.type.parse(result)
    object.setLoadState(true)
    return object

  }

  async uploadUrl(url) {
    const result = await this.request({
      url: `${this.url}/api/upload/url`,
      method: 'POST',
      data: {
        url,
      },
      headers: {
         'Content-Type': 'application/json'
      },
    })

    const object = this.type.parse(result)
    object.setLoadState(true)
    return object
  }
}
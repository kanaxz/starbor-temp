const Collection = require('processing-client/Collection')
const axios = require('axios')

module.exports = class FileCollection extends Collection {
  async upload(file, type, options = {}) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type.definition.name)
    const url = `${this.url}/api/upload/file`
    try {
      const response = await axios({
        url,
        method: 'POST',
        data: formData,
        withCredentials: true,
        onUploadProgress: options.onUploadProgress,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      const result = response.data
      const object = this.type.parse(result)
      return object
    } catch (err) {
      throw new Error(`API error: ${err.message}`,)
    }
  }
}
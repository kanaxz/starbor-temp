const { File } = require('storage')

module.exports = class GLTF extends File {
  static accept({ mimetype, name }) {
    const ext = name.split('.').pop()
    return mimetype === 'text/plain' && ext === 'gltf'
  }
}
  .define({
    name: 'gltf',
  })
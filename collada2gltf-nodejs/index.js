const { join } = require('path')
const { execFile } = require('./utils')

// based on https://github.com/CesiumGS/collada2gltf-web-service/

module.exports = async (daePath, gltfPath) => {
  await execFile(join(__dirname, 'COLLADA2GLTF.exe'), [
    '-f', daePath,
    '-o', gltfPath,
    '-e'
  ])
}
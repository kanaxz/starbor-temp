const { GLTFable, Positionable, Sphereable, Orbitable, Orbit } = require('starbor')
const { BackgroundImageable, Folder } = require('storage')
const { basename, join } = require('path')
const { createReadStream } = require('fs')
const collada2gltf = require('collada2gltf-nodejs')
const { makeId } = require('sools-core/utils/string')
const { rm } = require('fs/promises')
const { gePositionFromLatLon, loadUrl, tempFolder } = require('./utils')

module.exports = ({ uploadFolder }) => {
  return [
    [BackgroundImageable, async (object, json) => {
      if (json.thumbnail) {
        object.backgroundImage = await Folder.collection.uploadUrl(json.thumbnail.source, {
          folder: uploadFolder.toJSON(null),
        })
      }
    }],
    [GLTFable, async (object, json) => {
      const daePath = await loadUrl(json.model.source)
      const gltfPath = join(tempFolder, `${makeId()}.gltf`)
      await collada2gltf(daePath, gltfPath)
      const gltfFile = createReadStream(gltfPath)
      object.asset = await Folder.collection.upload(gltfFile, {
        folder: uploadFolder.toJSON(null),
      })
      await rm(gltfPath)
      await rm(daePath)
    }],
    [Orbitable, async (object, json) => {
      object.position = new Orbit({
        latitude: parseFloat(json.latitude),
        longitude: parseFloat(json.longitude),
        orbitPeriod: parseFloat(json.orbit_period || 0)
      })
    }],
    [Sphereable, async (object, json) => {
      if (json.texture) {
        object.texture = await Folder.collection.uploadUrl(json.texture.source, {
          folder: uploadFolder.toJSON(null),
        })
      }

      Object.assign(object, {
        axialTilt: parseFloat(json.axial_tilt),
        size: parseFloat(json.size)
      })
    }],
  ]
}
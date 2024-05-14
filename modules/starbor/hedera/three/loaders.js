const THREE = require('three')
const manager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(manager)

//THREE.Cache.enabled = true

const loadTexture = async (url) => {
  return new Promise((resolve) => {
    textureLoader.load(url, resolve)
  })
}


module.exports = {
  loadTexture,
  manager
}
const Object = require("./ThreeObject");
const { loadTexture } = require('../loaders')
const THREE = require('three')

module.exports = class SphereObject extends Object {
  constructor(model) {
    super()
    this.model = model
  }

  async getMaterials() {
    const { model } = this
    let map
    if (model.texture) {
      map = this.ressource(await loadTexture(model.texture.path))
    }
    const material = this.ressource(new THREE.MeshBasicMaterial({
      map,
      transparent: true,
      opacity: 1,
    }))
    return [material]
  }

  async setup() {
    const sphere = this.ressource(new THREE.SphereGeometry(10))
    const materials = await this.getMaterials()
    console.log({ materials })
    const mesh = new THREE.Mesh(sphere, materials[0])
    this.add(mesh)
    super.setup()
  }

  animate() {
    this.rotation.y = (Date.now() * 0.0003) % 360
  }
}
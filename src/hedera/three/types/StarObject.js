const THREE = require('three')
const SphereObject = require('./SphereObject')

module.exports = class StarObject extends SphereObject {


  getMaterials() {
    const color = new THREE.Color('#FDB813')
    const material = new THREE.MeshBasicMaterial({ color: color })
    return [material]
  }

  async setup() {
    const light = new THREE.AmbientLight('#FFFFFF', 0.2)
    this.add(light)
    super.setup()
  }
}
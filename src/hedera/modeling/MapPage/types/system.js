
const { random } = require('sools-core/utils/number')
const THREE = require('three')
const mercury = require('./8k_mercury.jpg')
const loadingManager = new THREE.LoadingManager()
const loader = new THREE.TextureLoader(loadingManager)

const texture = loader.load(mercury)
const generateRandom = () => {
  return Array.from(Array(10))
    .map((i) => {
      return {
        x: random(0, 10),
        y: random(0, 10),
        z: random(0, 10),
      }
    })
}


module.exports = async (scene, system) => {
  console.log('system loading')
  await system.load()
  const points = generateRandom()
  for (const point of points) {
    const object = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(1)
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    })
    mesh = new THREE.Mesh(geometry, material)
    object.add(mesh)
    Object.assign(object.position, point)
    scene.add(object)
  }
}
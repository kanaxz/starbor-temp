const THREE = require('three')

const getStats = (object) => {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())
  return {
    size,
    center
  }
}

module.exports = {
  getStats,
}
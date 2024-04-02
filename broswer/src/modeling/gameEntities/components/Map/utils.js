const calculateDistance = (p1, p2) => {
  var a = p2.x - p1.x;
  var b = p2.y - p1.y;
  var c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}

const getMax = (object, objects) => {
  let max = 0
  for (const o of objects) {
    if (object === o) { continue }
    const distance = calculateDistance(object.position, o.position)
    if (distance > max) {
      max = distance
    }
  }
  return max
}

module.exports = {
  getMax,
  calculateDistance
}
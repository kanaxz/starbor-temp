const Virtual = require('hedera/Virtual')

let mousePosition = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
}

window.addEventListener('mousemove', (event) => {
  mousePosition = {
    x: event.clientX,
    y: event.clientY
  }
})


const getDistance = (p, min, max) => {
  if (p < min) { return p - min }
  if (p > max) { return p - max }
  return 0
}

module.exports = class Projection extends Virtual {
  onReady() {
    const callback = () => {
      this.setFocalPoint(mousePosition)
      requestAnimationFrame(callback)
    }
    callback()
  }

  setFocalPoint(point) {
    const { el } = this
    const rect = el.getBoundingClientRect()
    const x = getDistance(point.x, rect.left, rect.left + rect.width)
    const y = getDistance(point.y, rect.top, rect.top + rect.height)
    Object.assign(el.style, {
      transform: `rotateX(${-y / 100}deg) rotateY(${x / 100}deg)`
    })
  }
}
  .define({
    name: 'projection',
  })
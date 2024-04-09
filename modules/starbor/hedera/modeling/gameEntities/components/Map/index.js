
const template = require('./template.html')
const Camera = require('./Camera')
const Layer = require('./Layer')
const MapObject = require('./Object')
const { calculateDistance, getMax } = require('./utils')
const Component = require('hedera/Component')
const { bound: boundInt } = require('core/utils/number')
require('./style.scss')

const toRadians = (angle) => {
  return angle * (Math.PI / 180);
}


const MAX_LAYERS = 6
const LAYER_DISTANCE = 400
const MIN_ZOOM = 0.2
const MAX_ZOOM = 2
const RADIANS = toRadians(360)

const bound = (position, square) => {
  position.x = boundInt(position.x, square.x)
  position.y = boundInt(position.y, square.y)
}


module.exports = class Map extends Component {
  constructor() {
    super()
    this.on('propertyChanged:object', this.b(this.update))
    this.camera = new Camera({
      x: 0,
      y: 0,
      zoom: 1.0,
    })
  }

  async start() {
    const systems = await Entities.collection.find([{
      $is: ['$this', 'system']
    }], {
      load: {
        organization: true,
      }
    })

    this.mapObjects = systems
      .filter((system) => system.starmap?.position)
      .map((object) => {
        if (!object.organization)
          console.log(object)
        return new MapObject({
          object,
          name: object.name,
          position: object.starmap.position,
          color: object.organization?.color,
          x: 0,
          y: 0,
        })
      })
    this.layers = [...Array(MAX_LAYERS)].map((nop, i) => {
      return new Layer({
        x: 0,
        y: 0,
        size: (i + 1) * LAYER_DISTANCE
      })
    })

    if (!this.object) {
      this.object = systems[0]
    }

    this.update()
    Object.assign(this.camera, {
      x: this.clientWidth / 2,
      y: this.clientHeight / 2,
    })
  }

  onInit() {
    this.start()
  }

  update() {
    const mapObject = this.mapObjects.find((mo) => mo.object === this.object)
    if (!mapObject) { return }
    this.mapObject = mapObject
    Object.assign(this.mapObject, {
      x: 0,
      y: 0,
    })

    const maxDistance = getMax(this.mapObject, this.mapObjects)
    let min = 0
    this.layers.forEach((layer, i) => {
      const max = 100 / MAX_LAYERS * (i + 1)
      let matching = []
      this.mapObjects.forEach((o) => {
        if (o === this.mapObject) { return }
        const distance = calculateDistance(o.position, this.mapObject.position)
        const percentage = distance * 100 / maxDistance

        if (percentage >= min && percentage <= max + 1) {
          matching.push(o)
        }
      })
      const length = matching.length
      matching.forEach((o, i) => {
        const position = i * (RADIANS / length)
        o.x = Math.cos(position) * layer.size / 2
        o.y = Math.sin(position) * layer.size / 2
      })
      min = max
    })
  }

  onMouseDown() {
    this.isDown = true
  }

  onMouseUp() {
    this.isDown = false
  }

  onMove(event) {
    if (!this.isDown) { return }
    this.camera.x += event.movementX
    this.camera.y += event.movementY
    bound(this.camera, {
      x: [0, this.clientWidth],
      y: [0, this.clientHeight]
    })
  }

  onWheel(event) {
    if (!event.ctrlKey) { return }

    event.preventDefault()
    const zoom = this.camera.zoom - (event.deltaY / 1000)
    this.camera.zoom = boundInt(zoom, [MIN_ZOOM, MAX_ZOOM])
  }

  destroy() {
    this.mapObjects.forEach((o) => o.destroy())
    return super.destroy()
  }
}
  .define({
    name: 'app-map',
    template,
  })
  .properties({
    object: 'any',
    currentObject: 'any',
    mapObjects: 'any',
    layers: 'any',
  })


const Main = require('@app/layouts/Main')
const template = require('./template.html')
const objects = require('./points')
const Camera = require('./Camera')
const Layer = require('./Layer')
const MapObject = require('./Object')
const { calculateDistance, getMax } = require('./utils')
const Component = require('hedera/Component')
const { collections } = require('@app/api')
require('./style.scss')

const toRadians = (angle) => {
  return angle * (Math.PI / 180);
}


const MAX_LAYERS = 6
const LAYER_DISTANCE = 400
const MIN_ZOOM = 0.2
const MAX_ZOOM = 2
const RADIANS = toRadians(360)

const boundInt = (int, [min, max]) => {
  if (int < min) {
    return min
  }
  if (int > max) {
    return max
  }
  return int
}

const bound = (position, square) => {
  position.x = boundInt(position.x, square.x)
  position.y = boundInt(position.y, square.y)
}


module.exports = class Map extends Component {
  constructor() {
    super()
    this.on('propertyChanged:object', this.b(this.update))
    console.log('dimensiosn', this.clientHeight, this.clientWidth)
    this.camera = new Camera({
      x: 0,
      y: 0,
      zoom: 1.0,
    })
  }

  async start() {
    const systems = await collections.entities.find([{
      $is: ['$this', 'system']
    }], {
      load: {
        organization: true,
      }
    })

    console.log({ ...systems[0] })


    this.mapObjects = systems.map((object) => {
      return new MapObject({
        object,
        name: object.name,
        position: object.starmap.position,
        color: object.organization.color,
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

  initialized() {
    super.initialized()
    this.start()
  }

  async update() {
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

    console.log({ layers: this.layers, maxDistance })
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
}
  .define({
    name: 'app-map',
    template,
    layout: Main,
  })
  .properties({
    object: 'any',
    currentObject: 'any',
    mapObjects: 'any',
    layers: 'any',
  })

const template = require('./template.html')
const Component = require('hedera/Component')
const THREE = require('three')
const types = require('./types')
require('./style.scss')

module.exports = class MapPage extends Component {

  constructor(mapeable) {
    super()
    this.mapeable = mapeable

  }

  onMouseDown(e) {

  }

  async onReady() {
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer()
    let camera
    this.appendChild(renderer.domElement)


    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    const type = types[this.mapeable.constructor.definition.name]
    if (type) {
      await type(scene, this.mapeable)
    }

    setTimeout(() => {
      camera = new THREE.PerspectiveCamera(100, this.clientWidth / this.clientHeight, 0.1, 1000);
      camera.position.z = 30;
      renderer.setSize(this.clientWidth, this.clientHeight);
      animate()
    })



  }
}
  .define({
    name: 'map-page',
    template,
  })
  .properties({

  })
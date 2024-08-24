const template = require('./template.html')
const Component = require('sools-hedera/Component')
const THREE = require('three')
const types = require('./types')
require('./style.scss')

module.exports = class MapPage extends Component {

  constructor(Positionable) {
    super()
    this.Positionable = Positionable

  }

  onMouseDown(e) {

  }

  async onInit() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
  }

  async onReady() {

    const { renderer } = this
    const scene = new THREE.Scene()
  
    this.appendChild(this.renderer.domElement)
    
    let camera

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    /*
    const type = types[this.mapeable.constructor.definition.name]
    if (type) {
      await type(scene, this.mapeable)
    }
    */

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
const template = require('./template.html')
const Component = require('hedera/Component')
require('./style.scss')
const types = require('../../three/types')
const THREE = require('three')
const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls')

module.exports = class ModelRender extends Component {
  async onInit() {

  }

  async onReady() {
    const { model } = this
    await model.load()
    const type = types.getType(model)
    if (!type) {
      throw new Error('Type not found')
    }



    // RENDERER
    const size = {width: this.clientWidth, height: this.clientHeight}
    //const size = { width: window.innerWidth, height: window.innerHeight }
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,

    })
    //renderer.setClearColor(0xcccccc)
    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.setSize(size.width, size.height)
    this.appendChild(renderer.domElement)


    // OBJECT
    const object = type(model)
    await object.setup(renderer)
    console.log('object size', object.size)
    // CAMERA
    const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 0.01, 1000)
    camera.near = object.size / 100
    camera.updateProjectionMatrix()
    camera.position.add({
      x: object.size / 5.0,
      y: object.size / 10.0,
      z: object.size / 1.5
    })

    // LIGHT
    const light1 = new THREE.AmbientLight('#FFFFFF', 0.2)
    const light2 = new THREE.DirectionalLight('#FFFFFF', 0.8 * Math.PI)
    camera.add(light1, light2)

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.screenSpacePanning = true

    // SCENE
    const scene = new THREE.Scene()
    scene.add(camera, object)
  
    const animateScene = () => {
      requestAnimationFrame(animateScene)
      object.animate()
      controls.update()
      renderer.render(scene, camera)
    }

    Object.assign(this, {
      object,
      controls,
      camera,
      renderer
    })

    animateScene()
  }

  destroy() {
    super.destroy()
    this.object.destroy()
  }
}
  .define({
    name: 'model-render',
    template,
  })
  .properties({
    model: 'any',
  })
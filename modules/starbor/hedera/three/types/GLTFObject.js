const ThreeObject = require('./ThreeObject')
const { manager } = require('../loaders')
const THREE = require('three')
const { getStats } = require('./utils')
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader')
const { DRACOLoader } = require('three/examples/jsm/loaders/DRACOLoader')
const { KTX2Loader } = require('three/examples/jsm/loaders/KTX2Loader')
const { MeshoptDecoder } = require('three/examples/jsm/libs/meshopt_decoder.module')
const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`
const DRACO_LOADER = new DRACOLoader(manager)
  .setDecoderPath(`${THREE_PATH}/examples/jsm/libs/draco/gltf/`)
const KTX2_LOADER = new KTX2Loader(manager)
  .setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`)


module.exports = class GLTFObject extends ThreeObject {
  constructor(model) {
    super()
    this.model = model
  }

  async setup(renderer) {
    const { asset } = this.model

    const gLTFloader = new GLTFLoader(manager)
      .setCrossOrigin('anonymous')
      .setDRACOLoader(DRACO_LOADER)
      .setKTX2Loader(KTX2_LOADER.detectSupport(renderer))
      .setMeshoptDecoder(MeshoptDecoder);

    const gltf = await gLTFloader.loadAsync(asset.path)
    const { scene } = gltf
    this.add(scene)
    super.setup()
  }

  animate() {
    //this.rotation.y = (Date.now() * 0.0003) % 360
  }
}
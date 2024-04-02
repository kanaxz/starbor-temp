(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([[815],{

/***/ 10869:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "storage-page{width:100%;height:100%;display:flex;flex-direction:row;position:relative}storage-page .left{width:fit-content;height:100%;border-right:1px solid #e1e1e1}storage-page>.right{width:100%;display:flex;flex-direction:column}storage-page>.right>.bar{display:flex;flex-direction:row;width:100%;height:35px;border-bottom:1px solid #e1e1e1}storage-page>.right>.bar input{font-size:16px;height:100%;border:none;border-right:1px solid #e1e1e1}storage-page>.right>.bar .actions{display:flex;flex-direction:row}storage-page>.right>.bar .actions div{display:flex;align-items:center;justify-content:center;border-right:1px solid #e1e1e1;padding:5px;cursor:pointer}storage-page>.right>.bar .actions div:hover{background-color:aquamarine}storage-page>.right>.bar .actions div svg{font-size:20px}storage-page>.right>.bar .actions div.upload input{display:none}storage-page>.right editable-grid .folder-panel .folders{display:flex;flex-direction:row;align-items:center;margin-left:10px}storage-page>.right editable-grid .folder-panel .folders .branch{display:flex;flex-direction:row-reverse;align-items:center}storage-page>.right editable-grid .folder-panel .folders .branch .folder{display:flex;flex-direction:row;align-items:center}storage-page>.right editable-grid .folder-panel .folders .branch .folder::after{font-size:26px;font-weight:600;content:\" \";width:15px;border-bottom:1px dashed #e1e1e1}storage-page>.right editable-grid .folder-panel .storage-objects{display:flex;flex:1;flex-direction:row;flex-wrap:wrap;padding-left:10px;padding-top:10px}storage-page>.right editable-grid .folder-panel .storage-objects>*{margin-right:10px;margin-bottom:10px}storage-page>.right editable-grid .file{border:none;width:100%;height:100%;background-color:#e1e1e1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 32584:
/***/ (function(module) {

// Module
var code = "<self :v-selectable-root=\"'horizontal'\" :v-loader=\"this.@loading size '50px'\"> <div class=\"left\"> <folder-tree :folder=\"this.@currentFolder\" :root=\"this.initialFolder\" :on-selected=\"this.focusFolder(event.folder)\"> </folder-tree> </div> <div class=\"right\"> <div class=\"bar\"> <input as=\"input\" :v-input-delay=\"this.search(node.value)\" placeholder=\"search\"> <div class=\"actions\"> <div :on-click=\"this.inputFile.click()\" class=\"upload\"> <input type=\"file\" as=\"inputFile\" :on-change=\"this.uploadFile(node.files[0])\"/> <i class=\"fa-solid fa-file-arrow-up\"></i> </div> <div> <i class=\"fa-solid fa-link\"></i> </div> <div :on-click=\"this.createFolder()\"> <i class=\"fa-solid fa-folder-plus\"></i> </div> </div> </div> <template in=\"templates\" :for=\"File\" :as=\"'file'\"> <iframe class=\"file\" :src=\"file?.@path\"> </iframe> </template> <editable-grid class=\"content\" as=\"grid\" :templates=\"this.templates\" :directions=\"{left: false, top: false}\" :max-deepth=\"2\"> <grid-panel class=\"folder-panel\"> <slot name=\"header\"> <div class=\"folders\"> <div class=\"branch\" :v-for=\"folder of this.@currentFolder.branch.filterLink((f)=>f === this.initialFolder || f.branch.indexOf(this.initialFolder) !== -1)\"> <div class=\"folder\"> <folder-row :on-click=\"this.focusFolder(folder)\" :model=\"folder\"> </folder-row> </div> </div> <folder-row class=\"selected open\" :model=\"this.@currentFolder\"> </folder-row> </div> </slot> <slot> <div class=\"storage-objects\" :v-for=\"storageObject of this.@storageObjects.sortLink((o1, o2)=> (o1 instanceof Folder ? 0 : 1) - (o2 instanceof Folder ? 0 : 1))\"> <model-card :model=\"storageObject\" :v-selectable=\"this.onFileObjectClicked(storageObject)\"> </model-card> </div> </slot> </grid-panel> </editable-grid> </div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 83193:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(10869);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 86815:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(32584)
const Component = __webpack_require__(58497)
const StorageObject = __webpack_require__(67968)
const Array = __webpack_require__(83083)
const { File, Folder } = __webpack_require__(97870)
const context = __webpack_require__(35293)
const Right = __webpack_require__(56816)
__webpack_require__(83193)

module.exports = class StoragePage extends Component {
  constructor(initialFolder) {
    super()
    this.initialFolder = initialFolder
    this.files = new Array()
  }

  async onInit() {
    await this.focusFolder(this.initialFolder, false)
  }

  focus() {
    this.input.focus()
  }

  async focusFolder(folder, pushState = true) {
    this.loading = true
    await folder.children.load()
    await folder.branch.load({
      children: true,
    })

    this.currentFolder = folder
    this.storageObjects = folder.children
    if (pushState) {
      //history.pushState({}, '', `/explorer${folder.path}`)
    }
    this.loading = false
  }

  async onFileObjectClicked(storageObject) {
    if (storageObject instanceof Folder) {
      await this.focusFolder(storageObject)
    } else {
      this.grid.add(storageObject)
      this.event('selected', { file: storageObject })
    }
  }

  async onKeyUp(event) {
    if (event.key === 'Backspace') {
      const folder = this.currentFolder.folder
      if (!folder) { return }
      await this.focusFolder(folder)
    }
    console.log(event.key)
  }

  async search(value) {
    this.currentFolder = null
    this.storageObjects = await StorageObject.collection.find([{ $match: ['$name', value] }])
  }

  async uploadFile(nativeFile) {
    this.progress = 0
    const onUploadProgress = (event) => {
      this.progress = Math.round((100 * event.loaded) / event.total)
      console.log('progress', this.progress)
    }

    const values = {
      folder: this.currentFolder,
      read: new Right({
        type: 'inherited'
      }),
      edit: new Right({
        type: 'inherited'
      })
    }
    const file = await StorageObject.collection.upload(nativeFile, values, { onUploadProgress })
    this.progress = null
    this.files.push(file)
    this.currentFile = file
  }

  removeFile(file) {
    console.log('files', this.files.length)
    this.files.remove(file)
    if (file === this.currentFile) {
      this.currentFile = this.files[0]
    }
    console.log('files', this.files.length)
  }

  async createFolder() {
    const name = await this.currentFolder.getNewFolderName(context)

    await Folder.collection.create({
      '@type': 'folder',
      folder: this.currentFolder.toJSON(),
      name,
      read: new Right({
        type: 'inherited'
      }),
      add: new Right({
        type: 'inherited'
      }),
      edit: new Right({
        type: 'inherited'
      })
    })
  }
}
  .define({
    name: 'storage-page',
    template,
  })
  .properties({
    folder: 'any',
    currentFolder: 'any',
    storageObjects: 'any',
    currentFile: 'any',
    loading: 'any',
  })
  .variables({
    Folder,
    File
  })

/***/ })

}]);
//# sourceMappingURL=815.bundle.js.map
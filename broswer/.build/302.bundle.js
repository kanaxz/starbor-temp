(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([[302],{

/***/ 63071:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 31275:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 14451:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 35763:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "empty-page{display:block;width:100%;height:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 77211:
/***/ (function(module) {

// Module
var code = "<self :class=\"'child'\"> Child <super> <super-slot></super-slot> <br> yes sure I'll override </super> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 97164:
/***/ (function(module) {

// Module
var code = "<self :class=\"'child-child'\"> Child Child <super> <super-slot></super-slot> <br> yes sure I'll override once again </super> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 9621:
/***/ (function(module) {

// Module
var code = "<self :class=\"'parent'\"> Parent <div slot> You can override me ! </div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 26357:
/***/ (function(module) {

// Module
var code = "<self> <model-card :model=\"this.folder\"></model-card> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 34715:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(63071);

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

/***/ 67916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(31275);

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

/***/ 44668:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(14451);

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

/***/ 40482:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(35763);

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

/***/ 91295:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Parent = __webpack_require__(89982)
const template = __webpack_require__(77211)
__webpack_require__(34715)

module.exports = class Child extends Parent {


}
  .define({
    name: 'child-comp',
    template,
  })

/***/ }),

/***/ 70610:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Child = __webpack_require__(91295)
const template = __webpack_require__(97164)
__webpack_require__(67916)

module.exports = class ChildChild extends Child {


}
  .define({
    name: 'child-child',
    template,
  })

/***/ }),

/***/ 89982:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(9621)
const Component = __webpack_require__(58497)
__webpack_require__(44668)

module.exports = class Parent extends Component {
  
  
}
  .define({
    template,
  })

/***/ }),

/***/ 39302:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(26357)
const Component = __webpack_require__(58497)
const Folder = __webpack_require__(11718)
const Loadable = __webpack_require__(36423)
__webpack_require__(40482)
__webpack_require__(70610)

module.exports = class EmptyPage extends Component {

  async onInit() {
    //const folder = new Folder()
    const folder = await Folder.collection.findByUniqueIndex({ path: "/storage/upload" })
    console.log(folder)
    await folder.folder.load()
    const folder2 = await Folder.collection.findByUniqueIndex({ path: "/storage/upload" })
    console.log('empty', folder === folder2, folder)
    this.folder = folder
    
    /**/
    //await folder.children.load()
    console.log({ folder }, folder.folder.children.length)
    /*
    setInterval(async () => {
      console.log('fetch')
      const folder2 = await Folder.collection.findByUniqueIndex({ path: "/storage/upload" })
      console.log(folder, folder2, folder === folder2)
    }, 5000)

    /*
    await folder.branch.load({
      children: true
    })

    for (const model of [folder, ...folder.branch]) {
      console.log(model.path, model.loaded, model.branch.loaded, model.children.loaded)
    }
    /**/
  }

  clicked() {
    this.name = Math.random()
    console.log('clicked', this.name)
    //this.grid.add({ name: Math.random() })
  }
}
  .define({
    name: 'empty-page',
    template,
  })
  .properties({
    name: 'any',
  })



/***/ })

}]);
//# sourceMappingURL=302.bundle.js.map
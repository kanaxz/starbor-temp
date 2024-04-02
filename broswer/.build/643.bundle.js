(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([[643],{

/***/ 35490:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 80308:
/***/ (function(module) {

// Module
var code = "<self> <button :on-click=\"this.notify()\">Notify</button> <button :on-click=\"this.add()\">Add</button> <button :on-click=\"this.sort()\">Sort</button> <button :on-click=\"this.reset()\">Reset</button> <div :v-for=\"object of this.@objects\"> <div> <label> {{object.id}} </label> <button :on-click=\"this.objects.remove(object)\">Remove</button> </div> </div> <img src=\"/storage/upload/vNh72P70uN3qp0720BI4_\"> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 12055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(35490);

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

/***/ 78643:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { notifications } = __webpack_require__(14498)
const Array = __webpack_require__(83083)
const template = __webpack_require__(80308)
const { System, LandingZone, Planet, Entity, GameEntity } = __webpack_require__(84138)
const User = __webpack_require__(62541)
const Jwt = __webpack_require__(88872)
const Component = __webpack_require__(58497)
__webpack_require__(12055)

module.exports = class Home extends Component {
  constructor() {
    super()
    this.objects = new Array()

  }

  async onReady() {
    const jwt = Jwt.parse({
      "@type": "jwt",
      "_id": "H3rHl6kBsBbV9C2FURJr-",
      "user": {
        "@type": "user",
        "_id": "J0SBTiI8r8bbADVZcCYRz"
      },
      "name": "azef",
      "id": "varilP7kVVqSOZx",
      "key": "3abec63ab9a2810c31646351ffbdff5d24a0214ac522b28c62b14d10ecd7b2e9dbe7aa540bd44283354bf1d353a8fc1c3383f3dc6e69189f412c3f10547eb253"
    })
    console.log({ jwt })
  }

  reset() {
    this.objects = new Array()
  }


  add() {
    this.objects.push({
      id: Math.random()
    })
  }

  sort() {
    this.objects.sort((a, b) => b.id - a.id)
  }

  notify() {
    notifications.notify({
      type: 'info',
      message: 'Un Citizen vous veut du bien !'
    })
  }
}
  .define({
    name: 'app-home',
    template,
  })
  .properties({
    objects: 'any',
  })
  .variables({
    System,
  })


/***/ })

}]);
//# sourceMappingURL=643.bundle.js.map
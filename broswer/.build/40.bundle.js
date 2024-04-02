(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([[40],{

/***/ 86598:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-edit-page{display:block;padding:15px;height:100%;width:100%;overflow:auto}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 90004:
/***/ (function(module) {

// Module
var code = "<self> <model-form :on-saved=\"this.onSaved(event)\" :model=\"this.model\" :type=\"this.model.constructor\"> </model-form> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 45763:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(86598);

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

/***/ 53040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(58497)
const template = __webpack_require__(90004)
const { navigator } = __webpack_require__(98864)
__webpack_require__(45763)

module.exports = class ModelEditPage extends Component {
  constructor(model){
    super()
    this.model = model
  }
  async onSaved({ model }) {
    await navigator.navigate(model.url)
  }

}
  .define({
    name: 'model-edit-page',
    template,
  })

/***/ })

}]);
//# sourceMappingURL=40.bundle.js.map
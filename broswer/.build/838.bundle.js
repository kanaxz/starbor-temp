(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([[838],{

/***/ 61735:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "jwt-page{display:block;width:100%;height:100%;align-items:center;justify-content:center}jwt-page .content{width:350px;height:250px;padding:25px;border:1px solid #e1e1e1;background-color:azure}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 65030:
/***/ (function(module) {

// Module
var code = "<self> <model-form :type=\"Jwt\" :states=\"this.createStates\" :on-saved=\"this.onSaved(event)\"> </model-form> <div class=\"jwts\" :v-for=\"jwt of this.jwts\"> <div :class=\"`jwt`\"> <model-form :mode=\"'read'\" :deletable=\"true\" :editable=\"true\" :disable-nested=\"true\" :model=\"jwt\" :type=\"Jwt\" :states=\"this.@newModel === jwt ? this.newModelStates : this.states\"> </model-form> </div> </div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 64608:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(61735);

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

/***/ 24838:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(65030)
const Component = __webpack_require__(58497)
const Jwt = __webpack_require__(88872)
const context = __webpack_require__(35293)
__webpack_require__(64608)

module.exports = class JwtPage extends Component {
  async onInit() {
    this.createStates = { user: { hidden: true, value: context.user } }
    this.states = { user: { hidden: true, value: context.user }, id: { readOnly: true, disabled: false } }
    this.newModelStates = { ...this.states, key: { disabled: false, readOnly: true } }
    //console.log('here', this.newModelstates)
    this.jwts = await Jwt.collection.find([
      {
        $eq: ['$user._id', context.user._id]
      }
    ])
  }
  async onReady() {

  }

  onSaved({ model }) {
    this.newModel = model
  }
}
  .define({
    name: 'jwt-page',
    template,
  })
  .properties({
    jwts: 'any',
    newModel: 'any',
  })
  .variables({
    Jwt
  })

/***/ })

}]);
//# sourceMappingURL=838.bundle.js.map
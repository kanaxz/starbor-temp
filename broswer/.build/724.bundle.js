(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([[724],{

/***/ 73556:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "signup-page{display:flex;width:100%;height:100%;align-items:center;justify-content:center}signup-page .content{width:350px;height:250px;padding:25px;border:1px solid #e1e1e1;background-color:azure}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 83636:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"content\"> <h3>Signup</h3> <object-form :type=\"Credentials\" :on-submit=\"this.onSubmit(event)\"> <slot name=\"bottom\"> <button class=\"submit\" type=\"submit\"> Login </button> </slot> </object-form> <a :v-link=\"'/login'\">Login</a> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 42373:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(73556);

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

/***/ 58724:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(83636)
const { navigator, auth } = __webpack_require__(98864)
const Component = __webpack_require__(58497)
const Credentials = __webpack_require__(97098)

__webpack_require__(42373)

module.exports = class Signup extends Component {
  async onSubmit({ object }) {
    console.log('submitting')
    await auth.signup(object)
    await navigator.navigate('/')
  }
}
  .define({
    name: 'signup-page',
    template,
  })
  .variables({
    Credentials
  })

/***/ })

}]);
//# sourceMappingURL=724.bundle.js.map
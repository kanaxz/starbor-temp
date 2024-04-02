(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([["src_auth_Login_index_js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/auth/Login/style.scss":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/auth/Login/style.scss ***!
  \****************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/layouts/Empty/style.scss":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/layouts/Empty/style.scss ***!
  \*******************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./src/auth/Login/template.html":
/*!**************************************!*\
  !*** ./src/auth/Login/template.html ***!
  \**************************************/
/***/ (function(module) {

// Module
var code = "<div>\n  <h3>Login</h3>\n  <form :on:submit.prevent=\"this.onSubmit()\">\n    <form-text-field \n      :label=\"'Username'\" \n      :name=\"'username'\" >\n    </form-text-field>\n    <form-text-field \n      :class-name=\"`nice ${this.test} ok`\"\n      :label=\"'Password'\" \n      :name=\"'password'\" \n      :type=\"'password'\" >\n    </form-text-field>\n      \n    <input type=\"submit\" value=\"submit\" />\n  </form>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "./src/layouts/Empty/template.html":
/*!*****************************************!*\
  !*** ./src/layouts/Empty/template.html ***!
  \*****************************************/
/***/ (function(module) {

// Module
var code = "<div>\n  <div as=\"container\">\n    \n  </div>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "./src/auth/Login/style.scss":
/*!***********************************!*\
  !*** ./src/auth/Login/style.scss ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/auth/Login/style.scss");

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

/***/ "./src/layouts/Empty/style.scss":
/*!**************************************!*\
  !*** ./src/layouts/Empty/style.scss ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/layouts/Empty/style.scss");

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

/***/ "./src/auth/Login/index.js":
/*!*********************************!*\
  !*** ./src/auth/Login/index.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Page = __webpack_require__(/*! @core/page/Page */ "./src/core/page/Page.js")
const Empty = __webpack_require__(/*! @app/layouts/Empty */ "./src/layouts/Empty/index.js")
const template = __webpack_require__(/*! ./template.html */ "./src/auth/Login/template.html")
const Auth = __webpack_require__(/*! ../service */ "./src/auth/service.js")
const navigator = __webpack_require__(/*! @app/navigator */ "./src/navigator.js")

__webpack_require__(/*! ./style.scss */ "./src/auth/Login/style.scss")

module.exports = class Home extends Page {
  async onSubmit() {
    console.log('submitting')
    await Auth.login({

    })

    await navigator.navigate('/')
  }
}.define({
  name: 'app-login',
  template,
  layout: Empty,
})

/***/ }),

/***/ "./src/core/mixins/LocalStorageable.js":
/*!*********************************************!*\
  !*** ./src/core/mixins/LocalStorageable.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Propertiable = __webpack_require__(/*! core/Propertiable */ "../core/Propertiable.js")
const mixer = __webpack_require__(/*! core/mixer */ "../core/mixer.js")

module.exports = mixer.mixin([Propertiable()], (base) => {
  return class LocalStorageable extends base {
    static localStorage(options) {
      this.localStorageOptions = options
      return this
    }

    constructor(...args) {
      super(...args)
      const options = this.constructor.localStorageOptions
      if (!options) { return }

      let initialValues = localStorage.getItem(options.name)
      if (initialValues) {
        initialValues = JSON.parse(initialValues)
        Object.assign(this, initialValues)
      }

      this.on('propertyChanged', () => {
        const values = this[Propertiable.symbol]
        const valuesToSave = Object.entries(values)
          .filter(([name]) => options.properties.indexOf(name) !== -1)
          .reduce((acc, [name, value]) => {
            acc[name] = value
            return acc
          }, {})

        localStorage.setItem(options.name, JSON.stringify(valuesToSave))
      })
    }
  }
})

/***/ }),

/***/ "./src/core/page/Layout.js":
/*!*********************************!*\
  !*** ./src/core/page/Layout.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(/*! @core/Component */ "./src/core/Component.js")
const renderer = __webpack_require__(/*! @core/renderer */ "./src/core/renderer.js")
const LocalStorageable = __webpack_require__(/*! @core/mixins/LocalStorageable */ "./src/core/mixins/LocalStorageable.js")
const mixer = __webpack_require__(/*! core/mixer */ "../core/mixer.js")

module.exports = class Layout extends mixer.extends(Component, [LocalStorageable()]) {
  initialized() {
    if (!this.container)
      throw new Error("Layout '" + this.constructor.name + "' must implement a container");
    return super.initialized();
  }

  async setView(view) {
    const oldView = this.currentView
    if (oldView) {
      this.container.removeChild(oldView)
    }
    this.currentView = view
    this.container.appendChild(this.currentView)
    await this.currentView.attach(this)
    if (oldView) {
      renderer.destroy(oldView)
    }
  }
}


/***/ }),

/***/ "./src/core/page/Page.js":
/*!*******************************!*\
  !*** ./src/core/page/Page.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(/*! @core/Component */ "./src/core/Component.js")

const pages = {}

module.exports = class Page extends Component {

  static register(pageName, layoutClass) {
    if (!views[pageName]) {
      this.viewName = pageName
      this.layoutClass = layoutClass
      views[pageName] = this
      return this
    } else
      throw new Error("View with name '" + pageName + "' is already registered")

  }

  static resolve(pageName) {
    return pages[pageName]
  }
}


/***/ }),

/***/ "./src/layouts/Empty/index.js":
/*!************************************!*\
  !*** ./src/layouts/Empty/index.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Layout = __webpack_require__(/*! @core/page/Layout */ "./src/core/page/Layout.js")
const template = __webpack_require__(/*! ./template.html */ "./src/layouts/Empty/template.html")
__webpack_require__(/*! ./style.scss */ "./src/layouts/Empty/style.scss")

module.exports = class Empty extends Layout {

}.define({
  name: 'app-layout-empty',
  template,
})

/***/ })

}]);
//# sourceMappingURL=src_auth_Login_index_js.bundle.js.map
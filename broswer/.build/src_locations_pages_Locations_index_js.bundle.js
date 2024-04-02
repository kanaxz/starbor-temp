(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([["src_locations_pages_Locations_index_js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/layouts/Main/style.scss":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/layouts/Main/style.scss ***!
  \******************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "app-layout-main {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column; }\n  app-layout-main > .top-bar {\n    height: 50px;\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    border-bottom: 1px solid #e1e1e1;\n    background-color: #ecf0f1; }\n    app-layout-main > .top-bar .burger {\n      margin-left: 20px;\n      cursor: pointer;\n      transform: rotate(0deg);\n      transition-duration: 0.2s; }\n      app-layout-main > .top-bar .burger:hover {\n        color: red;\n        transition-duration: 0.2; }\n    app-layout-main > .top-bar h3 {\n      flex: 1;\n      margin-left: 20px; }\n  app-layout-main > .row {\n    width: 100%;\n    flex: 1;\n    display: flex;\n    flex-direction: row;\n    overflow: hidden; }\n    app-layout-main > .row > .left-bar {\n      width: 175px;\n      height: 100%;\n      border-right: 1px solid #e1e1e1;\n      background-color: #ecf0f1;\n      overflow: hidden;\n      transition-duration: 0.2s; }\n      app-layout-main > .row > .left-bar .menu .link {\n        display: flex;\n        flex-direction: row;\n        width: 200px;\n        cursor: pointer;\n        padding: 5px; }\n        app-layout-main > .row > .left-bar .menu .link .image {\n          width: 17px;\n          height: 17px; }\n          app-layout-main > .row > .left-bar .menu .link .image svg {\n            width: 100%;\n            height: 100%; }\n        app-layout-main > .row > .left-bar .menu .link label {\n          margin-left: 20px;\n          flex: 1; }\n        app-layout-main > .row > .left-bar .menu .link:hover, app-layout-main > .row > .left-bar .menu .link.active {\n          background-color: #3498db;\n          color: #fff; }\n    app-layout-main > .row > .container {\n      flex: 1;\n      overflow: auto; }\n  app-layout-main.open > .top-bar > .burger {\n    transform: rotate(90deg);\n    transition: transform ease 0.2s; }\n  app-layout-main.open > .row .left-bar {\n    width: 27px; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/locations/components/LocationCard/style.scss":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/locations/components/LocationCard/style.scss ***!
  \***************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/locations/pages/Locations/style.scss":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/locations/pages/Locations/style.scss ***!
  \*******************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "app-locations-page {\n  width: 100%;\n  overflow: auto; }\n  app-locations-page .filter {\n    display: flex;\n    flex-direction: row;\n    align-items: center; }\n  app-locations-page .locations {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center; }\n    app-locations-page .locations .location {\n      display: block;\n      margin: 15px; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./src/layouts/Main/template.html":
/*!****************************************!*\
  !*** ./src/layouts/Main/template.html ***!
  \****************************************/
/***/ (function(module) {

// Module
var code = "<self :class=\"`${ this.@open && 'open' || '' }`\">\n  <div class=\"top-bar\">\n    <div class=\"burger\" :on:click=\"this.open = !this.open\">\n      <i class=\"fa-solid fa-bars\"></i>\n    </div>\n    <h3>Star citizen universe</h3>\n    <div class=\"user-menu\">\n      <div>\n        <label>Profil</label>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"left-bar\">\n      <div class=\"menu\" :v:for=\"link of this.menu\">\n        <a class=\"link\" :v:link=\"link.url\">\n          <div class=\"image\">\n            <i :class=\"link.class\"></i>\n          </div>\n          <label>{{link.label}}</label>\n        </a>\n      </div>\n    </div>\n    <div class=\"container\" as=\"container\"></div>\n  </div>\n</self>";
// Exports
module.exports = code;

/***/ }),

/***/ "./src/locations/components/LocationCard/template.html":
/*!*************************************************************!*\
  !*** ./src/locations/components/LocationCard/template.html ***!
  \*************************************************************/
/***/ (function(module) {

// Module
var code = "<self :class=\"`app-card`\">\n  {{location.name}}\n</self>";
// Exports
module.exports = code;

/***/ }),

/***/ "./src/locations/pages/Locations/template.html":
/*!*****************************************************!*\
  !*** ./src/locations/pages/Locations/template.html ***!
  \*****************************************************/
/***/ (function(module) {

// Module
var code = "<self>\n  <div class=\"filter\">\n    <app-type-selector as=\"typeSelector\" :type=\"Location\" :on:change=\"this.typeChanged()\"></app-type-selector>\n    <label>Name</label>\n    <input :on:input=\"this.onChange()\" as=\"name\" />\n  </div>\n  <div class=\"locations\" :v:for=\"location of this.@locations\">\n    <a class=\"location\" :v:link=\"`/location/${location._id}`\" :v:child=\"this.templateCard(location)\">\n    </a>\n  </div>\n</self>";
// Exports
module.exports = code;

/***/ }),

/***/ "./src/layouts/Main/style.scss":
/*!*************************************!*\
  !*** ./src/layouts/Main/style.scss ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/layouts/Main/style.scss");

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

/***/ "./src/locations/components/LocationCard/style.scss":
/*!**********************************************************!*\
  !*** ./src/locations/components/LocationCard/style.scss ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/locations/components/LocationCard/style.scss");

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

/***/ "./src/locations/pages/Locations/style.scss":
/*!**************************************************!*\
  !*** ./src/locations/pages/Locations/style.scss ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/locations/pages/Locations/style.scss");

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

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const config = __webpack_require__(/*! @app/config */ "./src/config/index.js")
const url = `${config.server.url}/api`
const models = __webpack_require__(/*! shared/models */ "../shared/models/index.js")


class Collection {
  constructor(modelClass) {
    this.modelClass = modelClass
  }

  async request(action, body) {
    console.log(`Requesting /api${action}`, body)
    const response = await fetch(`${url}/${this.modelClass.definition.pluralName}${action}`, {
      method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const result = await response.json()
    //console.log(result)
    return result
  }

  async find(query, options) {
    const modelsJson = await this.request('/find', {
      query,
      options,
    })
    const models = modelsJson.map((modelJson) => {
      const model = this.modelClass.build(modelJson)
      console.log(model)
      model.setLoad(options.load)
      return model
    })
    return models
  }
}

const collections = [models.locations.Location].reduce((acc, modelClass) => {
  acc[modelClass.definition.pluralName] = new Collection(modelClass)
  return acc
}, {})

module.exports = {
  collections
}


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

/***/ "./src/layouts/Main/index.js":
/*!***********************************!*\
  !*** ./src/layouts/Main/index.js ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Layout = __webpack_require__(/*! @core/page/Layout */ "./src/core/page/Layout.js")
const template = __webpack_require__(/*! ./template.html */ "./src/layouts/Main/template.html")
__webpack_require__(/*! ./style.scss */ "./src/layouts/Main/style.scss")

module.exports = class Main extends Layout {
  constructor() {
    super()
    this.menu = [
      {
        label: 'Home',
        class: 'fa-solid fa-house',
        url: '/',
      },
      {
        label: 'Market',
        class: 'fa-solid fa-shop',
        url: '/market',
      },
      {
        label: 'Models tree',
        class: 'fa-solid fa-shop',
        url: '/models-tree',
      },
      {
        label: 'Locations',
        class: 'fa-solid fa-shop',
        url: '/locations',
      }
    ]
  }
}
  .define({
    name: 'app-layout-main',
    template,
  })
  .properties({
    open: 'any'
  })
  .localStorage({
    name: 'main',
    properties: ['open'],
  })

/***/ }),

/***/ "./src/locations/components/LocationCard/index.js":
/*!********************************************************!*\
  !*** ./src/locations/components/LocationCard/index.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const AppComponent = __webpack_require__(/*! @app/main/AppComponent */ "./src/main/AppComponent.js")
const template = __webpack_require__(/*! ./template.html */ "./src/locations/components/LocationCard/template.html")
const Location = __webpack_require__(/*! shared/models/locations/Location */ "../shared/models/locations/Location.js")
__webpack_require__(/*! ./style.scss */ "./src/locations/components/LocationCard/style.scss")

module.exports = class LocationCard extends AppComponent {
  constructor(location) {
    super()
    this.location = location
  }
}
  .registry(Location, 'card', {
    affiliation: true,
  })
  .properties({
    location: 'any',
  })
  .define({
    name: 'app-location-card',
    template,
  })

/***/ }),

/***/ "./src/locations/pages/Locations/index.js":
/*!************************************************!*\
  !*** ./src/locations/pages/Locations/index.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Page = __webpack_require__(/*! @core/page/Page */ "./src/core/page/Page.js")
const Main = __webpack_require__(/*! @app/layouts/Main */ "./src/layouts/Main/index.js")
const api = __webpack_require__(/*! @app/api */ "./src/api/index.js")
const template = __webpack_require__(/*! ./template.html */ "./src/locations/pages/Locations/template.html")
const componentsService = __webpack_require__(/*! @app/main/componentsService */ "./src/main/componentsService.js")
const Location = __webpack_require__(/*! shared/models/locations/Location */ "../shared/models/locations/Location.js")

__webpack_require__(/*! ../../components/LocationCard */ "./src/locations/components/LocationCard/index.js")
__webpack_require__(/*! ./style.scss */ "./src/locations/pages/Locations/style.scss")


module.exports = class LocationsPage extends Page {
  constructor() {
    super()
    //this.on('propertyChanged:typeName',this.b(this.onChange))
  }
  async onChange() {
    console.log('changed')
    this.locations = await api.collections.locations.find([
      {
        is: ['$this', this.typeSelector.current.definition.name]
      },
      {
        match: ['$name', this.name.value]
      }
    ], {
      limit: 50,
      load: {
        affiliation: true,
      }
    })
  }

  async initialize() {
    await super.initialize()
    this.onChange()
  }

  templateCard(location) {
    const cardComponent = componentsService.get(location.constructor, 'card')
    return new cardComponent(location)
  }

  typeChanged() {
    this.onChange()
  }
}
  .variables({
    Location,
  })
  .define({
    name: 'app-locations-page',
    template,
    layout: Main,
  })
  .properties({
    locations: 'any',
    typeName: 'any',
  })

/***/ }),

/***/ "../shared/models/index.js":
/*!*********************************!*\
  !*** ../shared/models/index.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! core/modeling */ "../core/modeling/index.js")
module.exports = {
  locations: __webpack_require__(/*! ./locations */ "../shared/models/locations/index.js"),
  Affiliation: __webpack_require__(/*! ./Affiliation */ "../shared/models/Affiliation.js"),
}

/***/ }),

/***/ "../shared/models/locations/City.js":
/*!******************************************!*\
  !*** ../shared/models/locations/City.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Planet = __webpack_require__(/*! ./Planet */ "../shared/models/locations/Planet.js")
const GroundLocation = __webpack_require__(/*! ./GroundLocation */ "../shared/models/locations/GroundLocation.js")
module.exports = class City extends GroundLocation {

}
  .properties({
    parent: Planet,
  })
  .define({
    name: 'city',
    pluralName: 'cities'
  })

/***/ }),

/***/ "../shared/models/locations/EuclideanSpace.js":
/*!****************************************************!*\
  !*** ../shared/models/locations/EuclideanSpace.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Location = __webpack_require__(/*! ./Location */ "../shared/models/locations/Location.js")

module.exports = class  EuclideanSpace extends Location {

}
  .properties({
  })
  .define({
    name: 'euclideanSpace',
    pluralName: 'euclideanSpaces'
  })

/***/ }),

/***/ "../shared/models/locations/GroundLocation.js":
/*!****************************************************!*\
  !*** ../shared/models/locations/GroundLocation.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Location = __webpack_require__(/*! ./Location */ "../shared/models/locations/Location.js")
const EuclideanSpace = __webpack_require__(/*! ./EuclideanSpace */ "../shared/models/locations/EuclideanSpace.js")
class GroundPosition {

}

module.exports = class GroundLocation extends EuclideanSpace {

}
  .properties({
    position: GroundPosition,
  })
  .define({
    name: 'groundLocation',
    pluralName: 'groundLocations'
  })

/***/ }),

/***/ "../shared/models/locations/Moon.js":
/*!******************************************!*\
  !*** ../shared/models/locations/Moon.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Planet = __webpack_require__(/*! ./Planet */ "../shared/models/locations/Planet.js")
const OrbitLocation = __webpack_require__(/*! ./OrbitLocation */ "../shared/models/locations/OrbitLocation.js")
module.exports = class Moon extends OrbitLocation {

}
  .properties({
    parent: Planet,
  })
  .define({
    name: 'moon',
    pluralName: 'moons'
  })

/***/ }),

/***/ "../shared/models/locations/OrbitLocation.js":
/*!***************************************************!*\
  !*** ../shared/models/locations/OrbitLocation.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Location = __webpack_require__(/*! ./Location */ "../shared/models/locations/Location.js")
class OrbitPosition {

}

module.exports = class OrbitLocation extends Location {

}
  .properties({
    //position: OrbitPosition,
  })
  .define({
    name: 'orbitLocation',
    pluralName: 'orbitLocations'
  })

/***/ }),

/***/ "../shared/models/locations/Planet.js":
/*!********************************************!*\
  !*** ../shared/models/locations/Planet.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const OrbitLocation = __webpack_require__(/*! ./OrbitLocation */ "../shared/models/locations/OrbitLocation.js")
const System = __webpack_require__(/*! ./System */ "../shared/models/locations/System.js")

module.exports = class Planet extends OrbitLocation {

}
  .properties({
    //parent: System,
  })
  .define({
    name: 'planet',
    pluralName: 'planets'
  })

/***/ }),

/***/ "../shared/models/locations/Star.js":
/*!******************************************!*\
  !*** ../shared/models/locations/Star.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Location = __webpack_require__(/*! ./Location */ "../shared/models/locations/Location.js")
const System = __webpack_require__(/*! ./System */ "../shared/models/locations/System.js")

module.exports = class Star extends Location {

}
  .properties({
    parent: System,
  })
  .define({
    name: 'star',
    pluralName: 'stars'
  })

/***/ }),

/***/ "../shared/models/locations/index.js":
/*!*******************************************!*\
  !*** ../shared/models/locations/index.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = {
  System: __webpack_require__(/*! ./System */ "../shared/models/locations/System.js"),
  OrbitLocation:__webpack_require__(/*! ./OrbitLocation */ "../shared/models/locations/OrbitLocation.js"),
  Planet: __webpack_require__(/*! ./Planet */ "../shared/models/locations/Planet.js"),
  Star: __webpack_require__(/*! ./Star */ "../shared/models/locations/Star.js"),
  Moon: __webpack_require__(/*! ./Moon */ "../shared/models/locations/Moon.js"),
  Location: __webpack_require__(/*! ./Location */ "../shared/models/locations/Location.js"),
  GroundLocation:__webpack_require__(/*! ./GroundLocation */ "../shared/models/locations/GroundLocation.js"),
  City:__webpack_require__(/*! ./City */ "../shared/models/locations/City.js"),
}

/***/ })

}]);
//# sourceMappingURL=src_locations_pages_Locations_index_js.bundle.js.map
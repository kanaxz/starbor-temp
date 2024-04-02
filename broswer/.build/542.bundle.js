(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([[542],{

/***/ 78769:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-layout{width:100%;height:100%}model-layout>header{display:flex;flex-direction:row;align-items:center;width:100%;height:90px;background-color:rgba(236,240,241,0.2);border-bottom:1px solid #e1e1e1}model-layout>header>.before{height:100%}model-layout>header>.before>div{height:100%}model-layout>header .infos{margin-left:50px}model-layout>header .infos h3{font-size:26px}model-layout>.content{display:flex;flex-direction:row;align-items:start;height:100%}model-layout>.content .actions{display:flex;flex-direction:column;height:100%;background-color:#ecf0f1;border-right:1px solid #e1e1e1;width:fit-content}model-layout>.content .actions a{width:60px;height:60px;display:flex;align-items:center;justify-content:center;padding:5px;cursor:pointer;font-size:30px}model-layout>.content>.container{width:100%;height:100%;flex:1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 57049:
/***/ (function(module) {

// Module
var code = "<self> <header> <div class=\"before\" :v-for=\"fragment of this.@beforeHeader\"> <div :inner-html=\"fragment.fragment\"> </div> </div> <div class=\"infos\"> <h3>{{ this.@model.@title }}</h3> </div> </header> <div class=\"content\"> <div class=\"actions\" :v-for=\"action of this.@actions\"> <a :class=\"`action ${action.class || ''}`\" :v-link=\"action.url !== undefined ? this.@model.url + action.url : null\" :on-click=\"this.onActionClicked(action, event)\" :inner-html=\"action.content\"> </a> </div> <div :v-loader=\"!this.@contentReady size '50px'\" class=\"container\" as=\"container\"></div> </div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 42491:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(78769);

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

/***/ 37542:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Layout = __webpack_require__(87968)
const template = __webpack_require__(57049)
const setup = __webpack_require__(73531)
__webpack_require__(42491)

Object.entries(setup.actions).forEach(([k, v]) => v.name = k)

module.exports = class ModelLayout extends Layout {

  constructor() {
    super()
    this.on('propertyChanged:model', this.b(this.onModelChanged))
  }

  async onInit() {
    await this.onModelChanged()
  }

  async onActionClicked(action) {
    if (action.url != undefined) { return }
    await action.execute(this.model)
  }

  async onModelChanged() {
    if (!this.model) { return }
    const setupActions = Object.values(setup.actions).sort((a, b) => (b.position || 1) - (a.position || 1))
    const actions = []
    for (const action of setupActions) {
      try {
        await action?.check(this.model)
        actions.push(action)
      } catch (err) {

      }
    }
    this.actions = actions

    this.beforeHeader = (await Promise.all(
      setup.layout.header.before.map((builder) => builder(this.model))
    ))
      .filter((o) => o)
  }
}
  .define({
    name: 'model-layout',
    template,
  })
  .properties({
    actions: 'any',
    model: 'any',
    beforeHeader: 'any',
  })

/***/ })

}]);
//# sourceMappingURL=542.bundle.js.map
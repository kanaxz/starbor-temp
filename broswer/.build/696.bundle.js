(self["webpackChunkstar_citizen_universe_client"] = self["webpackChunkstar_citizen_universe_client"] || []).push([[696],{

/***/ 32920:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23645);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-show-page{display:flex;flex-direction:row;width:100%;height:100%;position:relative;align-items:flex-start;overflow-y:scroll}model-show-page content-summary{position:sticky;top:20px;width:200px}model-show-page>.left{padding:25px;padding-left:0;flex:1;padding-bottom:150px}model-show-page>.left .description{background-color:#f9fafb;border-radius:10px;color:#72777d;max-width:1500px;padding:10px;text-align:justify;font-size:26px;font-weight:300;margin-left:calc(25px + 22px)}model-show-page>.left .childs{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;justify-content:flex-start;margin-top:20px}model-show-page>.left .childs .child{padding-bottom:15px;margin-right:15px;cursor:pointer}model-show-page>.left .map{margin-top:30px}model-show-page>.left .map app-map{margin-top:10px;border:1px solid #e1e1e1;width:100%;height:1000px;background-color:rgba(225,225,225,0.1)}model-show-page>.right{position:sticky;top:50px;width:300px}model-show-page>.right .infos{display:flex;flex-direction:column}model-show-page>.right .infos .main-image{width:100%;min-height:250px;object-fit:contain;background-color:#e1e1e1}model-show-page>.right .infos>.content{border:1px solid #e1e1e1;border-top:none;padding:10px}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 25650:
/***/ (function(module) {

// Module
var code = "<self> <content-summary :root=\"this\" as=\"summary\"></content-summary> <div :inner-html=\"this.@model.@wiki\"> </div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 27086:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(93379);
            var content = __webpack_require__(32920);

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

/***/ 57696:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(25650)
const Component = __webpack_require__(58497)
__webpack_require__(27086)


module.exports = class WikiPage extends Component {
  constructor(model) {
    super()
    this.model = model
  }

  async onReady() {
    this.summary.update()
  }
}
  .define({
    name: 'wiki-page',
    template,
  })
  .properties({
    model: 'any',
  })

/***/ })

}]);
//# sourceMappingURL=696.bundle.js.map
const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
require('../../components/ModelsTree')
require('./style.scss')

module.exports = class ModelsTreePage extends Page {

}.define({
  name: 'app-models-tree-page',
  template,
  layout: Main,
})
const Layout = require('hedera/page/Layout')
const template = require('./template.html')
require('./style.scss')
require('../../modeling/components/Search')
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
        label: 'Entities',
        class: 'fa-solid fa-shop',
        url: '/entities',
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
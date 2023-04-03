const Layout = require('@core/page/Layout')
const template = require('./template.html')
require('./style.scss')

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
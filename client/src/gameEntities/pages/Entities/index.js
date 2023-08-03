const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const api = require('@app/api')
const template = require('./template.html')
const { Entity } = require('shared/types')

require('./style.scss')


module.exports = class EntitiesPage extends Page {

}
  .define({
    name: 'app-entities-page',
    template,
    layout: Main,
  })
  .variables({
    Entity,
  })
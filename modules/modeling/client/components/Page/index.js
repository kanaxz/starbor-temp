const mixer = require('core/mixer')
const Registerable = require('@app/main/mixins/Registerable')
const Page = require('hedera/page/Page')
require('./style.scss')


module.exports = class ModelPage extends mixer.extends(Page, [Registerable]) {

}
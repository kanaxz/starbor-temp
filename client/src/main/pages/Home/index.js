const { notifications } = require('@app/global')
const Array = require('core/types/Array')
const template = require('./template.html')
const { System, LandingZone, Planet, Entity, GameEntity } = require('shared/types')
const Component = require('hedera/Component')
require('./style.scss')

module.exports = class Home extends Component {
  constructor() {
    super()
    this.objects = new Array()

  }

  async onReady() {

  }

  reset() {
    this.objects = new Array()
  }


  add() {
    this.objects.push({
      id: Math.random()
    })
  }

  sort() {
    this.objects.sort((a, b) => b.id - a.id)
  }

  notify() {
    notifications.notify({
      type: 'info',
      message: 'Un Citizen vous veut du bien !'
    })
  }
}
  .define({
    name: 'app-home',
    template,
  })
  .properties({
    objects: 'any',
  })
  .variables({
    System,
  })

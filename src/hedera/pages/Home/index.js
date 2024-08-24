const { notifications } = require('sools-hedera/global')
const Array = require('sools-core/types/Array')
const template = require('./template.html')
const { System, Planet } = require('starbor')
const { Jwt } = require('jwt')
const Component = require('sools-hedera/Component')
require('./style.scss')

module.exports = class Home extends Component {
  constructor() {
    super()
    this.objects = new Array()

  }

  async onReady() {
    const jwt = Jwt.parse({
      "@type": "jwt",
      "_id": "H3rHl6kBsBbV9C2FURJr-",
      "user": {
        "@type": "user",
        "_id": "J0SBTiI8r8bbADVZcCYRz"
      },
      "name": "azef",
      "id": "varilP7kVVqSOZx",
      "key": "3abec63ab9a2810c31646351ffbdff5d24a0214ac522b28c62b14d10ecd7b2e9dbe7aa540bd44283354bf1d353a8fc1c3383f3dc6e69189f412c3f10547eb253"
    })
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
    Planet
  })

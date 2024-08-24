const Component = require('sools-hedera/Component')
const template = require('./template.html')
require('./style.scss')
const sound = require('./click.webm')

let clicked = false
window.addEventListener('click', () => {
  clicked = true
})

module.exports = class StarborInterface extends Component {
  onReady() {
    this.addEventListener('animationend', () => {
      this.classList.remove('start')
    })
    if (this.classList.contains('interactable')) {
      this.audio = new Audio(sound)
      this.audio.volume = 0.3
      this.addEventListener('mouseenter', this.b(this.onMouseEnter))
    }

    if (this.classList.contains('clickable')) {
      this.addEventListener('click', this.b(this.onClick))
    }
  }

  playAudio() {
    if (!clicked) { return }
    this.audio.currentTime = 0
    this.audio.play()
  }

  onClick() {
    this.playAudio()
    this.classList.remove('clicked')

    setTimeout(() => {
      this.classList.add('clicked')
    })
  }

  onMouseEnter() {
    this.playAudio()
  }

  destroy() {
    //this.classList.add('destroy')
    super.destroy()
  }
}
  .define({
    name: 'app-interface',
    template,
  })
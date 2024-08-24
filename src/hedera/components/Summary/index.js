const Component = require('sools-hedera/Component')
const template = require('./template.html')
require('./style.scss')

const getCover = (bound1, bound2) => {
  const max = Math.min(bound1[1], bound2[1])
  const min = Math.max(bound1[0], bound2[0])
  return Math.max(max - min, 0)
}

const focusClass = 'summary-section-focus'

module.exports = class Summary extends Component {

  constructor() {
    super()
    this.on('propertyChanged:root', this.b(this.update))
  }

  onInit() {
    this.update()
  }

  update() {
    if (!this.root) { return }
    const root = this.root
    this.sections = [...root.querySelectorAll('[summary-section]')]
    this.current = this.sections[0]

    root.addEventListener('scroll', () => {
      const rootBound = [root.scrollTop, root.clientHeight + root.scrollTop]
      if (this.current) {
        this.current.classList.remove(focusClass)
      }
      this.current = this.sections
        .map(({ element, title }) => {
          const height = element.clientHeight
          const start = element.offsetTop
          const elementBound = [start, start + height]

          const cover = getCover(rootBound, elementBound)
          const percentage = (cover * 100 / height)
          return {
            element,
            percentage,
            cover,
          }
        })
        .sort((a, b) => b.percentage - a.percentage)
        .filter(({ percentage }, i, c) => percentage == c[0].percentage)
        .sort((a, b) => b.cover - a.cover)
      [0]
        .element
      this.current.classList.add(focusClass)
    })
  }

  focus(element) {
    element.scrollIntoView({
      behavior: 'smooth'
    })
  }
}
  .define({
    name: 'content-summary',
    template,
  })
  .properties({
    root: 'any',
    sections: 'any',
    current: 'any',
  })


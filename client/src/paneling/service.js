const Service = require('hedera/Service')
const Array = require('core/types/Array')
const { wait, immediate } = require('core/utils/promise')

const ANIMATION_DURATION = 201

class PanelService extends Service {
  constructor() {
    super()
    this.panels = new Array()
    this.isClosing = false
    this.closePromises = []
  }

  async closing() {
    if (!this.isClosing) {
      return
    }

    const promise = new Promise((resolve) => {
      this.closePromises.push(resolve)
    })
    await promise
    await this.closing()
  }

  async show(panel, fromElement) {
    await this.closing()
    let startIndex = this.panels.findIndex((p) => p.contains(fromElement))
    console.log({ startIndex })
    if (startIndex !== -1) {
      startIndex++
    } else {
      startIndex = 0
    }
    const startPanel = this.panels[0]
    if (startPanel) {
      await this.close(startPanel)
    }

    this.panels.push(panel)
    await wait(1)
    panel.isOpen = true
    await wait(ANIMATION_DURATION)
  }

  async close(panel) {
    if (this.isClosing) {
      throw new Error()
    }
    this.isClosing = true
    const index = this.panels.indexOf(panel)
    for (let i = this.panels.length - 1; i >= index; i--) {
      const panel = this.panels[i]
      panel.isOpen = false
      await wait(ANIMATION_DURATION)
      this.panels.splice(i, 1)
    }
    this.isClosing = false
    const promises = this.closePromises = []
    this.closePromises = []
    promises.forEach((r) => r())
  }
}
PanelService
  .define()
  .properties({
    panels: 'any',
  })

const service = new PanelService()
module.exports = service


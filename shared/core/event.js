const event = () => {
  const listeners = []
  const listen = (listener) => {
    listeners.push(listener)
  }

  const trigger = (...args) => {
    for (const listener of listeners) {
      listener(...args)
    }
  }

  listen.trigger = trigger

  return listen
}

module.exports = event

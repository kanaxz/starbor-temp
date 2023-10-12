module.exports = {
  name: 'modeling',
  async construct() {

    const controllers = []

    const controller = (type, controller) => {
      controllers.push({
        type,
        controller
      })
    }

    return {
      controller,
      controllers
    }
  }
}
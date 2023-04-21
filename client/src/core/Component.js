const mixer = require('core/mixer')
const Base = require('./Base')

class temp extends HTMLElement {

}

module.exports = class Component extends mixer.extends(temp, [Base()]) {
  static define(definition) {
    
    if (definition.name) {
      customElements.define(definition.name, this)
    }
    return super.define(definition)
  }

  get el() {
    return this
  }

  event(name, arg) {
    var event = new CustomEvent(name, {
      bubbles: false,
      'detail': arg
    });
    return this.dispatchEvent(event);
  }
}
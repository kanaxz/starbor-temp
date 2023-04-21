const Propertiable = require("core/Propertiable")
const mixer = require('core/mixer')

module.exports = class Service extends mixer.extends([Propertiable()]) {
    constructor () {
        super()
        this.initialize()
    }
}
const Base = require('core/Base')
const mixer = require('core/mixer')

console.log("Base", mixer.base == Base)
const mixin1 = mixer.mixin((base) => class extends base { }).define()
const mixin2 = mixer.mixin((base) => class extends base { }).define()

class Model1 extends mixer.extends([mixin1]) {

}

Model1.define()

class Model2 extends mixer.extends(Model1, [mixin2]) {

}

Model2.define()

console.log(mixer.is(Model1.prototype, mixin1), true)
console.log(mixer.is(Model2.prototype, mixin1), true)


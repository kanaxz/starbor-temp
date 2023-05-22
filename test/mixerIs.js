const Base = require('core/Base')
const mixer = require('core/mixer')
const Template = require('core/modeling/types/Template')
const Any = require('core/modeling/Any')

const TemplateOfAny = Template.of(Any)
console.log(Any.prototype.constructor === Any)

console.log(Any.prototype instanceof TemplateOfAny.definition.template)
console.log(mixer.is(Any.prototype, TemplateOfAny.definition.template), true)

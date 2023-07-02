const setup = require('core/setup')

const Holdable = require('./modeling/mixins/Holdable')
const Holder = require('./modeling/mixins/Holder')
const SingleInstance = require('./modeling/mixins/SingleInstance')
const ArrayHolder = require('./modeling/mixins/ArrayHolder')
const Loadable = require('./modeling/mixins/Loadable')
const Transformable = require('./modeling/mixins/Transformable')
const HasTransformable = require('./modeling/mixins/HasTransformable')
const ArrayHasTransformable = require('./modeling/mixins/ArrayHasTransformable')

const model = setup.modeling.model
model.before.push(Holdable, Holder, Transformable, HasTransformable, SingleInstance)
model.after.push(Loadable)

const arrayAssociation = setup.modeling.arrayAssociation
arrayAssociation.before.push(ArrayHolder, Holdable, ArrayHasTransformable)
arrayAssociation.after.push(Loadable)

module.exports = setup
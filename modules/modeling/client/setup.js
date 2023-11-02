const modelingSetup = require('modeling/setup')
const Holdable = require('./mixins/Holdable')
const Holder = require('./mixins/Holder')
const SingleInstance = require('./mixins/SingleInstance')
const ArrayHolder = require('./mixins/ArrayHolder')
const Loadable = require('./mixins/Loadable')
const Transformable = require('./mixins/Transformable')
const HasTransformable = require('./mixins/HasTransformable')
const ArrayHasTransformable = require('./mixins/ArrayHasTransformable')


const Controlleable = require('./mixins/Controlleable')
const { object, model, arrayAssociation } = modelingSetup


object.before.push(Controlleable)
model.before.push(Holdable, Holder, Transformable, HasTransformable, SingleInstance)
model.after.push(Loadable)

arrayAssociation.before.push(ArrayHolder, Holdable, ArrayHasTransformable)
arrayAssociation.after.push(Loadable)


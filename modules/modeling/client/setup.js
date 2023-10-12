
const Holdable = require('./mixins/Holdable')
const Holder = require('./mixins/Holder')
const SingleInstance = require('./mixins/SingleInstance')
const ArrayHolder = require('./mixins/ArrayHolder')
const Loadable = require('./mixins/Loadable')
const Transformable = require('./mixins/Transformable')
const HasTransformable = require('./mixins/HasTransformable')
const ArrayHasTransformable = require('./mixins/ArrayHasTransformable')
const hederaSetup = require('hedera/setup')
const setup = require('modeling/setup')
const { model } = setup

hederaSetup.base.push(Holder)

model.before.push(Controlleable, Holdable, Holder, Transformable, HasTransformable, SingleInstance)
model.after.push(Loadable)

const { arrayAssociation } = setup
arrayAssociation.before.push(ArrayHolder, Holdable, ArrayHasTransformable)
arrayAssociation.after.push(Loadable)

module.exports = setup
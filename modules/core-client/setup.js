const setup = require('core/setup')

const Holdable = require('./modeling/mixins/Holdable')
const Holder = require('./modeling/mixins/Holder')
const SingleInstance = require('./modeling/mixins/SingleInstance')
const ArrayHolder = require('./modeling/mixins/ArrayHolder');
const Loadable = require('./modeling/mixins/Loadable');

const model = setup.modeling.model
model.before.push(Holdable, Holder, SingleInstance)
model.after.push(Loadable)

const arrayAssociation = setup.modeling.arrayAssociation
arrayAssociation.before.push(ArrayHolder, Holdable)
arrayAssociation.after.push(Loadable)

module.exports = setup
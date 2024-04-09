
const Holdable = require('./mixins/holding/Holdable')
const HoldableFragment = require('./mixins/holding/HoldableFragment')
const Holder = require('./mixins/holding/Holder')
const ArrayHolder = require('./mixins/holding/ArrayHolder')
const Transformable = require('./mixins/transforming/Transformable')
const Referenceable = require('./mixins/Referenceable')
const ClientHasMany = require('./mixins/ClientHasMany')
const SingleInstance = require('./mixins/SingleInstance')
const ClientQueryResult = require('./mixins/ClientQueryResult')
const context = require('core-client/context')
const ClientModel = require('./mixins/ClientModel')
const setup = require('modeling/setup')

const { object, model, arrayAssociation, baseModels, models, hasMany, queryResult } = setup


model.before.push(Holdable, Holder, Transformable, SingleInstance)

baseModels.before.push(ArrayHolder, Referenceable)
models.before.push(Holdable, ClientModel)
arrayAssociation.before.push(HoldableFragment)
hasMany.before.push(ClientHasMany)
queryResult.before.push(ClientQueryResult)

setup.getArgs = (args) => {
  if (args[0] !== context) {
    args.unshift(context)
  }
  return args
}
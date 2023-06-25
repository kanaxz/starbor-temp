const Holdable = require('./modeling/mixins/Holdable')
const Holder = require('./modeling/mixins/Holder')
const SingleInstance = require('./modeling/mixins/SingleInstance')
const ArrayHolder = require('./modeling/mixins/ArrayHolder');

globalThis.core = {
  modeling: {
    model: {
      mixins: [Holdable, Holder, SingleInstance]
    },
    arrayAssociation: {
      mixins: [ArrayHolder, Holdable]
    }
  }
}
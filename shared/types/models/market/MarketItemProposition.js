const { Model } = require('core/modeling/types')
const User = require('../User')
const MarketItem = require('./MarketItem')

module.exports = class MarketItemProposition extends Model {

}

    .define({
        name:'proposition',
        pluralName:'propositions',
        collection: true,
    })
    .properties({
        marketItem: MarketItem,
        user: User,
    })
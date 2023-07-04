const { Number, Model } = require('core/modeling/types')
const item = require('./item')


module.exports = class MarketItem extends Model {

}

    .define({
        name:'marketitem',
        pluralName:'marketitems',
        collection: true,
    })

    .properties({
        item: {
            type: item,
        },
        market: {
            type: Market,
        },
        price: {
            type: Number,
        },
    })
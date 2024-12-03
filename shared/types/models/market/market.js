const { String, Model } = require('core/modeling/types')
const User = require('../User')
const Markdown = require('../../Markdown')

module.exports = class Market extends Model {

}

    .define({
        name: 'market',
        pluralName: 'markets',
        collection: true,
    })

    .properties({
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        owner: {
            type: User, 
            required: true,
            readonly: true,
        },
        description: {
            type: Markdown,
            required: true,
        },
    })
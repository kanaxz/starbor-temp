const { String, Model } = require('core/modeling/types')
const Markdown = require('../../Markdown')

module.exports = class Item extends Model {

}

    .define({
        name:'item',
        pluralName:'items',
        collection:true,
    })
    .properties({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        }      
    })

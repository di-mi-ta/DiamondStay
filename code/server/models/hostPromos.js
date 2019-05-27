var mongoose = require('mongoose')
const Schema = mongoose.Schema

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        default: 0.0
    },
    code: {
        type: String,
        default: ''
    },
    dateStart: {
        type: Date,
        defaut: ''
    },
    dateEnd: {
        type: Date,
        default: ''
    },
    creator: {
        type: String,
        required: true
    },
    homeposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomePosts'
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('HostPromotions', promotionSchema);
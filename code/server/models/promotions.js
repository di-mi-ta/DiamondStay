var mongoose = require('mongoose')
const Schema = mongoose.Schema

const homeAppliedPromotion = new Schema({
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomePosts'
    }
})

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logoPath: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        default: 0.0
    },
    description: {
        type: String, 
        required: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    type: {
        type: Number, // 0: host promotion, 1: system promotion
        min: 0,
        max: 1,
        default: 0,
    },
    homeposts: [homeAppliedPromotion]
},{
    timestamps: true
})

module.exports = mongoose.model('Promotions', promotionSchema);
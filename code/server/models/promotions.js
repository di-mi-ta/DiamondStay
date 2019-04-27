const mongoose = require('mongoose')
const Schema = mongoose.Schema

const homeAppliedPromotion = new Schema({
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomePost'
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
        ref: 'User'
    },
    homeposts: [homeAppliedPromotion]
},{
    timestamps: true
})

const Promotions = mongoose.model('Promotions', promotionSchema);
module.exports = Promotions;
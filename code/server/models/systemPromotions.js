var mongoose = require('mongoose')
const Schema = mongoose.Schema

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    logoPath: {
        type: String,
        default: ''
    },
    value: {
        type: Number,
        default: 0.0 // %, for example: 50%
    },
    maxValue: {
        type: Number,
        default: -1 
    },
    minValueBooking: {
        type: Number,
        default: -1 
    },
    maxNightsApplied: {
        type: Number,
        default: -1 
    },
    locationApplied: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Locations',
        default: ''
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
},{
    timestamps: true
})

module.exports = mongoose.model('SystemPromos', promotionSchema);
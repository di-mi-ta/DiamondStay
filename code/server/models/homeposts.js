const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('mongoose-currency').loadType(mongoose)

const Currency = mongoose.Types.Currency

const  ratingSchema = new Schema({
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true 
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const priceSchema = new Schema({
    numRoom: {
        type: Number,
        default: 0,
        require: true
    },
    price: {
        type: Currency,
        default: 0,
        require: true 
    }
});

const HomePostSchema = new Schema({
    rating: [ratingSchema],
    name: {
        type: String, 
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: [priceSchema],
    features: {
        type: String,
        default:'',      
    },
},{
    timestamps : true
});

module.exports = mongoose.model('HomePostSchema',HomePostSchema) 
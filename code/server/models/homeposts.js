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
        ref: 'Users'
    }
}, {
    timestamps: true
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
    price: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    features: {
        type: String,
        default: ''
    },
    mainFeatures: {
        type: String,
        default:'',      
    },
    state: {
        type: Number,
        min: 0,
        max: 2,
        require: true 
    },
    note:{
        type: String,
        default: ''
    },
    confirmedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
},{
    timestamps : true
});

module.exports = mongoose.model('HomePosts',HomePostSchema) 
var mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
    country: {
        type: String,
        default: 'Việt Nam'
    },
    province: {
        type: String,
        required: true 
    },
    district: {
        type: String,
        required: true 
    },
    street: {
        type: String,
        default: ''
    },
    homeNumber: {
        type: Number,
        default: ''
    }
});
module.exports = mongoose.model('Locations', locationSchema);
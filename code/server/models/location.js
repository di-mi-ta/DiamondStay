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
    }
});
export default mongoose.model('Locations', locationSchema);
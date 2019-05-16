var mongoose = require('mongoose')
const Schema = mongoose.Schema

require('mongoose-currency').loadType(mongoose)

const locationSchema = 'Locations';

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
    owner: {
        type: String,
        required: true,
    },

    // Prices
    weekdayPrice: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    weekendPrice: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    minimumNights: {
        type: Number,
        default: 1
    },

    // Descriptions
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],

    // Basic informations
    typeHome: {
        type: String,
        require: true,
        emum: ['Chung cư', 'Biệt thự', 'Căn hộ Studio', 'Nhà riêng', 'Khác']
    },
    typeRoom: {
        type: String,
        require: true,
        enum: ['Phòng riêng', 'Nguyên căn']
    },
    acreage: {
        type: Number,
        require: true,
        default: 0
    },
    maxPeoples: {
        type: Number,
        default: 1,
        required: true
    },

    // Phong va giuong
    numBed: {
        type: Number,
        require: true,
        default: 0
    },
    numBedroom: {
        type: Number,
        require: true,
        default: 0
    },
    numBathroom: {
        type: Number,
        require: true,
        default: 0
    },

    // location
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: locationSchema,
    },

    // verify information
    state: {
        type: String,
        default: 'waiting',
        enum: ['success', 'rejected', 'waiting', 'requireEdit', 'hiden']
    },

    confirmedBy: {
        type: String,
        default: ''
    },

    // Comments and ratings
    rating: [ratingSchema],
},{
    timestamps : true
});

module.exports = mongoose.model('HomePosts',HomePostSchema)

var mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paymentStatus: {
        type: Number,
        default: 0.0,
    },
    numNights: {
        type: Number,
        min: 0,
        default: 0,
    },
    appliedPromo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promotions'
    },
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomePosts'
    },
    dateStart: {
        type: Date,
        defaut: ''
    },
    dateEnd: {
        type: Date,
        default: ''
    },
    dateCreate: {
        type: Date,
        default: ''
    }
},{
    timestamps : true
});

module.exports = mongoose.model('Reservations',reservationSchema);

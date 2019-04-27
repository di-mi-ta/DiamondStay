const mongoose = require('mongoose')
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
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomePost'
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

module.exports = mongoose.model('ReservationSchema',reservationSchema);

var mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    paymentStatus: {
        type: String,
        enum: ['Đã thanh toán', 'Chưa thanh toán']
    },
    appliedHostPromo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promotions'
    },
    appliedSystemPromo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SystemPromos'
    },
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomePosts',
        required: true
    },
    dateCheckin: {
        type: Date,
        required: true
    },
    dateCheckout: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Reservations',bookingSchema);

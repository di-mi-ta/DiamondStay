const Booking = require('../models/booking');


// get all user's booking
function getAllBookings(req, res, next) {
    const userId = req.user._id;
    console.log(userId);
    Booking.find({ renter: userId }, (err, bookings) => {
        if (err) res.status(500).json({ err });
        else res.status(200).json({ bookings });
    })
}

// Get a booking given the id
function getBooking(req, res, next) {
    const id = req.params.id;
    Booking
        .findById(id)
        .populate('appliedHostPromo appliedSystemPromo home')
        .exec((err, booking) => {
            if (err) res.status(500).json({ err });
            else if (!booking) res.status(404).json({ err: 'Booking not found' });
            else res.status(200).json({ booking });
        });
}

function addBooking(req, res, next) {
    const data = req.body;
    const newBooking = {
        renter: req.user._id,
        paymentStatus: paymentStatus,
        numNights: data.numNights,
        appliedHostPromo: data.appliedHostPromo,
        appliedSystemPromo: data.appliedSystemPromo,
        home: data.home,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
    };

    Booking.create(newBooking, (err, booking) => {
        if (err || !booking) return res.status(500).json({ err });
        booking
            .populate('appliedHostPromo appliedSystemPromo home')
            .exec((err, booking) => {
                // if (err || !booking) return res.status(500).json({ err });
                res.status(200).json({ booking });
            });
    });
}


module.exports = {
    getAllBookings,
    getBooking,
    addBooking,
}
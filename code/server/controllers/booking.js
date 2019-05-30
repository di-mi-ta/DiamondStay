const Booking = require('../models/booking');
const Homepost = require('../models/homeposts');
const User = require('../models/user');
const moment = require('moment');
const log = require('debug')('CUONG');

// get all user's booking
function getAllBookings(req, res, next) {
    const userId = req.user._id;
    console.log(userId);
    Booking.find({ renter: userId }, (err, bookings) => {
        if (err)
          res.status(500).json({ err: {
            type: 'ServerError',
            message: 'Lỗi server',
            detail: err
          }});
        else res.status(200).json({ bookings });
    })
}

// Get a booking given the id
function getBooking(req, res, next) {
    Booking
        .fineOne({
          render: req.user._id,
          _id: req.params.id
        })
        .populate('appliedHostPromo appliedSystemPromo home')
        .exec((err, booking) => {
            if (err)
              res.status(500).json({ err: {
                type: 'ServerError',
                message: 'Lỗi server',
                detail: err
              }});
            else if (!booking) res.status(404).json({ err: {
              type: 'NotFound',
              message: 'Không tìm thấy booking',
            }});
            else res.status(200).json({ booking });
        });
}

async function addBooking(req, res, next) {
    const data = req.body;
    const booking = {
        renter: req.user._id,
        appliedHostPromo: data.appliedHostPromo,
        appliedSystemPromo: data.appliedSystemPromo,
        home: data.home,
        dateCheckin: getDateAt12AM(data.dateCheckin),
        dateCheckout: getDateAt12AM(data.dateCheckout),
    };

    // Check if checkin date is invalid
    const comparedToToday = compareDates(booking.dateCheckin, new Date());
    if (comparedToToday < 0) {
      return res.status(499).json({
        err: {
          type: 'InvalidCheckinDate',
          message: 'Ngày checkin không được trước ngày hiện tại',
          detail: {
            dateCheckin: booking.dateCheckin,
            today: getDateAt12AM(new Date())
          }
        }
      });
    }

    // Check if checkout date is invalid
    const numDates = compareDates(booking.dateCheckout, booking.dateCheckin);
    if (numDates < 1)
      return res.status(499).json({
        err: {
          type: 'InvalidCheckoutDate',
          message: 'Ngày checkout phải sau ngày checkin',
          detail: {
            dateCheckin: booking.dateCheckin,
            dateCheckout: booking.dateCheckout,
          }
        }
      });

    try {
        // Calculate cost
        const homepost = await Homepost.findById(booking.home);
        const price = homepost.weekdayPrice;

        const bookingCost = numDates * price;

        // Check if user has enough money
        let user = await User.findById(booking.renter);
        if (user.coin < bookingCost)
          return res.status(499).json({
            err: {
              type: 'NotEnoughMoney',
              message: 'Người dùng không đủ tiền',
              detail: {
                bookingCost: bookingCost,
                userCoint: user.coin,
              }
            }
          });

        // Update database
        user.coin -= bookingCost;
        user = await user.save();
        const bookingDoc = await Booking.create(booking);

        res.json({ booking: bookingDoc });
    } catch (err) {
      res.status(500).json({ err: {
        type: 'ServerError',
        message: 'Lỗi server',
        detail: err
      }});
    }
}

// Just get date, discard hour, minute, second, milliseconds
function getDateAt12AM(dateString) {
  const date = new Date(dateString);
  date.setHours(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setMilliseconds(0);
  return date;
}

function compareDates(dateObj1, dateObj2) {
  return moment(getDateAt12AM(dateObj1)).diff(moment(getDateAt12AM(dateObj2)), 'days');
}

module.exports = {
    getAllBookings,
    getBooking,
    addBooking,
}

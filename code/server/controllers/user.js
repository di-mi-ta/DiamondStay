const
    User = require('../models/user'),
    debug = require('debug')('CUONG');

function updateUserInfo(req, res, next) {
    User.findByIdAndUpdate(req.user._id, req.body).exec((err, user) => {
      if (err)
        return res.status(500).json({ err: {
          type: 'ServerError',
          message: 'Lỗi server',
          detail: err
        }});
      if (!user)
        return res.status(404).json({ err: {
          type: 'NotFound',
          message: 'Không tìm thấy người dùng',
        }});
      res.status(200).json({ user });
    });
}

const getInfoUserFromUsername = (req, res, next) => {
  User.findOne(req.query)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.json({ 
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        typeUser: user.typeUser,
        coin: user.coin,
        phone: user.phone
      }
    })
  }, err => next(err))
  .catch(err=> next(err));
}

module.exports = {
    updateUserInfo,
    getInfoUserFromUsername
}

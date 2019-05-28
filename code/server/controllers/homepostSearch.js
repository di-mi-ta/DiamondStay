/* for homepost search */

const Homepost = require('../models/homeposts');

function search(req, res, next) {
    const data = req.body;
    const obj = {
        name: data.name
    };

    Homepost.find({
      // name: obj.name,

    }, (err, homeposts) => {
        if (err) return res.status(500).json({
           err: {
             type: "ServerError",
             message: "Lỗi server",
           }
        });
        res.status(200).json({ homeposts });
    });
}

module.exports = {
    search,
}

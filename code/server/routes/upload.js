const
    express = require('express'),
    bodyParser = require('body-parser'),
    corsAllowAll = require('./cors').allowAll,
    uploadRouter = express.Router(),
    multer = require('multer');

uploadRouter
    .use(bodyParser.json())
    .use(corsAllowAll);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname )
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

uploadRouter.route('/')
    .post(upload.single('image'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })

module.exports = uploadRouter;

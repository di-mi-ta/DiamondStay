const HomePosts = require('../models/homeposts')

const getHomeposts = (req, res, next) => {
    HomePosts.find(req.query)
    .populate('location')
    .populate('rating.author')
    .then((homeposts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(homeposts)
    },(err) => next(err))
    .catch((err) => next(err));
}

const deleteAllHomePost = (req, res, next) => {
    HomePosts.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err));
}

const findHomePostDetailedById = (req,res,next) => {
    HomePosts.findById(req.params.homepostId)
    .populate('location')
    .populate('rating.author')
    .then((homepost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(homepost)
    }, (err) => next(err))
    .catch((err) => next(err))
}

const deleteHomePost = (req, res, next) => {
    HomePosts.findByIdAndRemove(req.params.homepostId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const updateHomePost = (req, res, next) => {
    HomePosts.findByIdAndUpdate(req.params.homepostId, {
        $set: req.body
    }, { new: true })
    .then((homepost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(homepost);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const createNewHomePost = (req, res, next) => {
    HomePosts.create(req.body)
    .then((homepost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(homepost);
    }, (err) => next(err))
    .catch((err) => next(err));
}

module.exports = {
    getHomeposts,
    deleteAllHomePost,
    createNewHomePost,
    updateHomePost,
    deleteHomePost,
    findHomePostDetailedById
}

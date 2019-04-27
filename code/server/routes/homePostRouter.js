const express = require('express')
const bodyParser = require('body-parser');

const homePostRouter= express.Router();

const HomePosts = require('../models/homeposts');
const authenticate = require('../authenticate');

homePostRouter.use(bodyParser.json());

homePostRouter.route('/')
.get((req,res,next) => {
    HomePosts.find({})
    .populate('rating.author')
    .then((homeposts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(homeposts)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
})

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    HomePosts.create(req.body)
    .then((homepost) => {
        console.log("HomePost created", homepost);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(homepost)
    }, (err) => next(err))
    .catch((err) => next(err))
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /homeposts');
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    HomePosts.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err));
});

homePostRouter.route('/:homePostId')
.get((req,res,next) => {
    HomePosts.findById(res.params.homePostId)
    .populate('rating.author')
    .then((homepost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(homepost)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /HomePosts/'+ req.params.homePostId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    HomePosts.findByIdAndUpdate(req.params.homePostId, {
        $set: req.body
    }, { new: true })
    .then((homepost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(homepost);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    HomePosts.findByIdAndRemove(res.params.homePostId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
});

homePostRouter.route('/:homePostId/rating/:ratingId')
.get((req,res,next) => {
    HomePosts.findById(req.params.homePostId)
    .populate('rating.author')
    .then((homepost) => {
        if (homepost != null && homepost.rating.id(req.params.ratingId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(homepost.rating.id(req.params.ratingId));
        }
        else if (homepost == null) {
            err = new Error('Homepost ' + req.params.homePostId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Rating ' + req.params.ratingId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /HomePosts/'+ req.params.homePostId
        + '/rating/' + req.params.ratingId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    HomePosts.findById(req.params.homePostId)
    .then((homepost) => {
        if (homepost != null && homepost.rating.id(req.params.ratingId) != null) {
            if (req.body.rating) {
                homepost.rating.id(req.params.ratingId).rating = req.body.rating;
            }
            homepost.save()
            .then((homepost) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(homepost);                
            }, (err) => next(err));
        }
        else if (homepost == null) {
            err = new Error('homepost ' + req.params.homePostId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Rating ' + req.params.ratingId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    HomePosts.findById(req.params.homePostId)
    .then((homepost) => {
        if (homepost != null && homepost.rating.id(req.params.ratingId) != null) {
            homepost.rating.id(req.params.ratingId).remove();
            homepost.save()
            .then((homepost) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(homepost);                
            }, (err) => next(err));
        }
        else if (homepost == null) {
            err = new Error('homepost ' + req.params.homePostId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Rating ' + req.params.ratingId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = homePostRouter;
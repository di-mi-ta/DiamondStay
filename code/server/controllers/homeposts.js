var mongoose = require('mongoose')
const Users = mongoose.model('Users');
const HomePosts = require('../models/homeposts')

const getListWaitingConfirmedHomePosts = (req, res, next) => {
    /* Description: Get list homepost to verify [FOR ADMIN]*/
    HomePosts.find({state: 'waiting'})
    .populate('rating.author')
    .then((homeposts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(homeposts)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
}

const getListHomePostsVerifyOK = (req, res, next) => {
    /* Description: Get list homeposts are comfirmed OK */
    HomePosts.find({state: 'success'})
    .populate('rating.author')
    .then((homeposts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(homeposts)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
}

const getMyHomePosts = (req, res, next) => {
    /* Description: get list homepost of specify user*/
    HomePosts.find({owner: req.body.username})
    .populate('rating.author')
    .then((homeposts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(homeposts)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
}

const deleteAllHomePost = (req, res, next) => {
    /* Description: Delete all homeposts (hope never use :))) [FOR ADMIN]*/
    HomePosts.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err));
}

const findHomePostDetailedById = (req,res,next) => {
    /* Description: Get detailed information of a homepost*/
    HomePosts.findById(res.params.homePostId)
    .populate('rating.author')
    .then((homepost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(homepost)
    }, (err) => next(err))
    .catch((err) => next(err))
}

const confirmHomePost = (req, res, next) => {
    /* Description: Confirm a homepost [FOR ADMIN]*/
    // TODO 
}

const rejectHomePost = (req, res, next) => {
    /* Description: Reject a homepost [FOR ADMIN]*/
    // TODO 
}

const requireEditingHomePost = (req, res, next) => {
    /* Description: Required user editting and resubmit a homepost [FOR ADMIN]*/
    // TODO 
}

const hideHomePost = (req, res, next) => {
    /* Description: Hide a homepost */
    // TODO 
}

const deleteHomePost = (req, res, next) => {
    /* Description: Delete a homepost */
    HomePosts.findByIdAndRemove(res.params.homePostId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
}

const updateHomePost = (req, res, next) => {
    /* Description: Update a homepost */
    HomePosts.findByIdAndUpdate(req.params.homePostId, {
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
    /* Description: Create new homepost */
    HomePosts.create(req.body)
    .then((homepost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(homepost);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const getLstRatingsOfHomePost = (req,res,next) => {
    /* Description: Get list ratings of a homepost*/
    // TO DO


}

const deleteRating = (req, res, next) => {
    /* Description: Delete one rating*/ 
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
}

const editRating = (req, res, next) => {
    /* Description: Editing rating*/
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
}

const postRating = (req, res, next) => {
    /* Description: Add new rating to a homepost*/
    // TO DO
}

module.exports = {
    getListWaitingConfirmedHomePosts,
    getListHomePostsVerifyOK,
    getMyHomePosts,
    deleteAllHomePost,
    editRating,
    deleteRating,
    createNewHomePost,
    getLstRatingsOfHomePost,
    updateHomePost,
    deleteHomePost,
    findHomePostDetailedById,
    confirmHomePost,
    rejectHomePost,
    requireEditingHomePost,
    hideHomePost,
    postRating
}
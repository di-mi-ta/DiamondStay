import mongoose, { SchemaType, SchemaTypes } from 'mongoose'; 

const Users = mongoose.model('Users');
const HomePosts = mongoose.model('HomePosts'); 

export const getListWaitingConfirmedHomePosts = (req, res, next) => {
    HomePosts.find({state: 'waiting'})
    .populate('rating.author')
    .then((homeposts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(homeposts)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
}

export const getListHomePostsVerifyOK = (req, res, next) => {
    HomePosts.find({state: 'success'})
    .populate('rating.author')
    .then((homeposts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(homeposts)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
}

export const getMyHomePosts = (req, res, next) => {
    HomePosts.find({owner = req.body.username})
    .populate('rating.author')
    .then((homeposts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(homeposts)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
}

export const deleteAllHomePost = (req, res, next) => {
    HomePosts.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err));
}

export const findHomePostById = (req,res,next) => {
    HomePosts.findById(res.params.homePostId)
    .populate('rating.author')
    .then((homepost) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(homepost)
    }, (err) => next(err))
    .catch((err) => next(err))
}

export const confirmHomePost = (req, res, next) => {
    // TODO 
}

export const rejectHomePost = (req, res, next) => {
    // TODO 
}

export const requireEditingHomePost = (req, res, next) => {
    // TODO 
}

export const hideHomePost = (req, res, next) => {
    // TODO 
}

export const deleteHomePost = (req, res, next) => {
    HomePosts.findByIdAndRemove(res.params.homePostId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
}

export const updateHomePost = (req, res, next) => {
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

export const createNewHomePost = (req, res, next) => {
    // TODO 
}

export const getListRatingOfHomePost = (req,res,next) => {
    /* TO DO */
    // HomePosts.findById(req.params.homePostId)
    // .populate('rating.author')
    // .then((homepost) => {
    //     if (homepost != null && homepost.rating.id(req.params.ratingId) != null) {
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'application/json');
    //         res.json(homepost.rating.id(req.params.ratingId));
    //     }
    //     else if (homepost == null) {
    //         err = new Error('Homepost ' + req.params.homePostId + ' not found');
    //         err.status = 404;
    //         return next(err);
    //     }
    //     else {
    //         err = new Error('Rating ' + req.params.ratingId + ' not found');
    //         err.status = 404;
    //         return next(err);            
    //     }
    // }, (err) => next(err))
    // .catch((err) => next(err));
}

export const deleteRating = (req, res, next) => {
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

export const editRating = (req, res, next) => {
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
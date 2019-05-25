var mongoose = require('mongoose')
const Users = mongoose.model('Users');
const HomePosts = require('../models/homeposts');


const getFavorites = (req, res, next) => {
    Favorites.find({})
    .populate('postedBy')
    .populate('homeposts')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const deleteFavorite = (req, res, next) => {

}

const addFavorite = (req, res, next) => {
    
}


module.exports = {
    getFavorites,
    deleteFavorite,
    addFavorite
}

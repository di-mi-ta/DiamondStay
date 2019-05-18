const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    homeposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomePosts',
        unique: true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Favorites', favoriteSchema);

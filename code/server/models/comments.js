const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    homepost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomePosts'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comments', commentSchema);
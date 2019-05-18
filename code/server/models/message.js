const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = mongoose.Schema.Types;

const MessageSchema = new Schema({
    sender: {
        type: types.ObjectId,
        ref: userSchema,
        required: true
    },
    receiver: {
        type: types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: types.Date,
        default: Date.now
    },
    title: {
        type: types.String,
        default: '',
        type: types.ObjectId,
    },
    content: {
        type: types.String,
        required: true
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
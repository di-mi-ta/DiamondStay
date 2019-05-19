const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = mongoose.Schema.Types;

const messageSchema = new Schema({
    sender: {
        type: types.ObjectId,
        ref: 'Users',
        required: true
    },
    receiver: {
        type: types.ObjectId,
        ref: 'Users',
        required: true
    },
    time: {
        type: types.Date,
        default: Date.now
    },
    title: {
        type: types.String,
        default: '',
    },
    content: {
        type: types.String,
        required: true
    },
    seen: {
        // seen by receiver
        type: types.Boolean,
        default: false
    },
});



const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
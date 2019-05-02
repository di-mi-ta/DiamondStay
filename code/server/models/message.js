const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = 'Users';

const MessageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userSchema,
        required: true
    },
    senderType: {
        enum: ['ADMIN', 'GUEST', 'PAID_CUSTOMER'],
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userSchema,
        required: true
    },
    time: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    title: {
        type: mongoose.Schema.Types.String,
        default: '[No Title]'
    },
    content: {
        type: mongoose.Schema.Types.String,
        default: ''
    }
},{
    timestamps : true
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
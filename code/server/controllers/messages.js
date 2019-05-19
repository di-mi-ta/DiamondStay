const
    Message = require('../models/message'),
    errors = require('./errors'),
    User = require('../models/user'),
    debug = require('debug')('CUONG');

function getUserInboxMessages(req, res, next) {
    Message
        .find({ receiver: req.user._id })
        .populate('sender')
        .exec((err, messages) => {
            if (err) {
                debug(err)
                return errors.sendQueryError(res);
            }
            res.status(200).json({
                success: true,
                messages,
            });
        });
}

function deleteMessage(req, res, next) {
    Message.findByIdAndDelete(req.body.messageId).exec((err, message) => {
        if (err)
            return errors.sendQueryError(res);
        if (message === null)
            return res.json({ success: false, message: 'Message not found' })
        res.status(200).json({ success: true });
    });
}

function addMessage(req, res, next) {
    if (req.user._id.toString() === req.body.receiverId)
        return res.json({
            success: false,
            message: 'Sender and receiver are the same'
        });
    const newMessage = {
        sender: req.user._id,
        receiver: req.body.receiverId,
        title: req.body.title,
        content: req.body.content,
        seen: false,
    };

    User.findById(newMessage.receiver).exec((err, user) => {
        if (err)
            errors.sendQueryError(res);

        // Receiver not exists
        if (user === null)
            return res.json({ success: false, message: 'Receiver not found' });

        Message.create(newMessage, (err, message) => {
            if (err)
                return errors.sendQueryError(res);

            res.json({ success: true, message });
        });

    });
}

module.exports = {
    getUserInboxMessages,
    addMessage,
    deleteMessage,
}
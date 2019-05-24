const
    Message = require('../models/message'),
    User = require('../models/user'),
    debug = require('debug')('CUONG');

function getUserInboxMessages(req, res, next) {
    Message
        .find({ receiver: req.user._id })
        .populate('sender')
        .exec((err, messages) => {
            if (err) {
                debug(err)
                res.status(500).json({ err: 'Internal server error' });
            }
            res.status(200).json({
                messages,
            });
        });
}

function deleteMessage(req, res, next) {
    Message.findByIdAndDelete(req.params.messageId).exec((err, message) => {
        if (err)
            return res.status(500).json({ err: 'Internal server error' });
        if (message === null)
            return res.json({ err: 'Message not found' })
        res.status(200).json({});
    });
}

function addMessage(req, res, next) {
    if (req.user._id.toString() === req.body.receiverId)
        return res.json({ err: 'Sender and receiver cannot be the same' });
    const newMessage = {
        sender: req.user._id,
        receiver: req.body.receiverId,
        title: req.body.title,
        content: req.body.content,
        seen: false,
    };

    User.findById(newMessage.receiver).exec((err, user) => {
        if (err)
            return res.status(500).json({ err: 'Internal server error' });

        // Receiver not exists
        if (!user)
            return res.json({ err: 'Receiver not found' });

        Message.create(newMessage, (err, message) => {
            if (err)
                return res.status(500).json({ err: 'Internal server error' });

            res.json({ message });
        });

    });
}

function seenMessage(req, res, next) {
    Message.findByIdAndUpdate(req.body.messageId, { seen: true }).exec((err, message) => {
        if (err)
            return res.status(500).json({ err: 'Internal server error' });
        // if (message === null)
        //     return res.json({ err: 'Message not found' })
        res.status(200).json({});
    });
}

module.exports = {
    getUserInboxMessages,
    addMessage,
    deleteMessage,
    seenMessage,
}
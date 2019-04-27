const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    // TODO 
},{
    timestamps : true
});

var MessageSchema = mongoose.model('Messages', MessageSchema)
module.exports = MessageSchema   
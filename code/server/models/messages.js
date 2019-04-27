const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    // TODO 
},{
    timestamps : true
});

var MessageSchema = mongoose.model('MessageSchema', MessageSchema)
module.exports = MessageSchema   
var mongoose = require('mongoose')
var Schema = mongoose.Schema 

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String, 
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone:{
        type: String,
        default: ''
    },
    typeUser: {
        type: Number,
        default: 0,   // 0: renter, 1: host, 2: admin 
    }
});


User.plugin(passportLocalMongoose);
module.exports = mongoose.model('Users', User);
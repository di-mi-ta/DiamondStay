var mongoose = require('mongoose')
var Schema = mongoose.Schema 

var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastname: {
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
        default: 0,
    }
});


User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);
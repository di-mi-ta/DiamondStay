const logger = require('morgan');
const mongoose = require('mongoose')
const passport = require('passport');

const mongoConfig = require('./config/mongoConfig');

const initialize = (app) => {
    // mongoose.Promise = require('bluebird'); // TODO: what is this
    mongoose.connect(mongoConfig.uri, { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => console.log('Connected to mongo database'))
        .on('error', () => {
            console.log('Failed to connect to mongo database. Exiting...');
            process.exit(1);
        });

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(passport.initialize());
};

module.exports = initialize;
const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:4444'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

const corsAllowAll = cors({
    allowedHeaders: ['Content-Type', 'Authorization'], // Authorization for JWT token
    origin: '*', // allow all origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allow need smethods
    preflightContinue: false,   // don't delegate OPTIONS request to my routers
});

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
exports.allowAll = corsAllowAll;
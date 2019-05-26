const Locations = require('../models/location')

const getLocations = (req, res, next) => {
    Locations.find(req.query)
    .then((locations) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(locations)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
}

const deleteAll = (req, res, next) => {
    Locations.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    },(err) => next(err)) 
    .catch((err) => next(err)); 
}

// export all functions
module.exports = {
    getLocations,
    deleteAll
}

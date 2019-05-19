const HostPromotions = require('../models/hostPromos')
const SystemPromotions = require('../models/systemPromos')

const createHostPromotion = (req, res, next) => {
    /* Description: Create new host promotion*/
    HostPromotions.create(req.body)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err)=> next(err));
}

const createSystemPromotion = (req, res, next) => {
    /* Description: Create new system promotion*/
    SystemPromotions.create(req.body)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err)=> next(err));
}

const updateHostPromotion = (req, res, next) => {
    HostPromotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const updateSystemPromotion = (req, res, next) => {
    SystemPromotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const deleteHostPromotion = (req, res, next) => {
    /* Description: Delete a host promotion*/
    HostPromotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const deleteSystemPromotion = (req, res, next) => {
    SystemPromotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const getHostPromoById = (req,res,next) => {
    HostPromotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err))
}

const getSystemPromoById = (req,res,next) => {
    SystemPromotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotion)
    }, (err) => next(err))
    .catch((err) => next(err))
}

const getHostPromoOfUser = (req, res, next) => {
    HostPromotions.find({creator: req.query.username})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotions)
    }, (err)=>next(err))
    .catch((err) => next(err))
}

const getFullListPromo = (req, res, next) => {
    SystemPromotions.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos)
    },
    (err)=> next(err))
    .catch((err) => next(err));
}

const getActiveSystemPromo = (req, res, next) => {
    SystemPromotions.find({ dateStart : {$gt: new Date(),
                            dateEnd: {$lt: new Date()}}})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos)
    },
    (err)=> next(err))
    .catch((err) => next(err));
}

// export all functions
module.exports = {
    createHostPromotion,
    createSystemPromotion,
    updateSystemPromotion,
    deleteSystemPromotion,
    updateHostPromotion,
    deleteHostPromotion,
    getHostPromoById,
    getHostPromoOfUser,
    getFullListPromo,
    getActiveSystemPromo,
    getSystemPromoById
}

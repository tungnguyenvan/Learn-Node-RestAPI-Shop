const express = require('express');
const route = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Oders were fetched!'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Oders was craeted'
    });
});

router.get('/:oderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order detail',
        oderId: req.params.oderId
    });
});

route.delete('/:oderId', (req, res, next) => {
    res.status(200).json({
        message: 'delete oder',
        oderId: req.params.oderId
    });
});


module.exports = route;
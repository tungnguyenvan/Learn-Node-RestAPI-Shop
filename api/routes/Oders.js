const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Oders were fetched!'
    });
});

router.post('/', (req, res, next) => {
    const oder = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Oders was craeted',
        oder: oder
    });
});

router.get('/:oderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order detail',
        oderId: req.params.oderId
    });
});

router.delete('/:oderId', (req, res, next) => {
    res.status(200).json({
        message: 'delete oder',
        oderId: req.params.oderId
    });
});


module.exports = router;
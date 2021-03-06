const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const multer = require('multer');
const checkAuth = require('../middleware/CheckAuth');

const storage = multer.diskStore({
    description: function(req, file, cb) {
        cb(null, './uploads/');
    },
    fileName: function(req, file, cb) {
        cb(null, Date().toString() + file.originalname);
    }
});

const fileFilter = function(req, file, cb) {
    if (file.minetype === 'image/jpeg' || file.minetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    dest: storage, 
    limits: {fileSize: 1024 * 2014 * 5},
    fileFilter : fileFilter
 }); 

router.get('/', (req, res, next) => {
    Product.find()
    .select('_id name price productImage')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            products: result
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path 
    });

    product.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST request to /products',
                craetedProduct: result
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            message: 'No valid empty found for provide ID'
        });
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps }).exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec()
    .then(result => {
        if (result.length >= 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: 'No entries found'})
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
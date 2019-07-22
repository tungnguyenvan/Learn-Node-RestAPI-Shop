const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../models/User');

router.post('/signup', function(req, res, next) {
    user.find({ email: req.body.email }).exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'email is exist'
            });
        } else {
            const password = bcrypt.hash(req.body.password, 10, (err, hass) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new user({
                        _id = new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    }); 
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'user created'
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            });
        }
    });
});

router.post('./login', (req, res, next) => {
    user.find({ email: req.body.email }).exec()
    .then(result => {
        if (result.length < 1) {
            res.status(404).json({
                message: 'email not found'
            });
        }

        bcrypt.compare(req.body.password, result[0].password, (err, result) => {
            if (err) {
                res.status(401).json({
                    message: 'auth failed'
                });
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: result[0].email,
                        _id: result[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    })
                return res.status(200).json({
                    message: 'auth successful ',
                    token: token
                });
            }

            res.status(401).json({
                message: 'auth failed'
            });
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/:userId', (req, res, next) => {
    user.remove({ _id: req.params.userId }).exec()
    .then(result => {
        res.status(200).json({
            message: 'user deleted'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;
const express = require('express');
const app = express();
const morgan = require('morgan'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoute  = require('./api/routes/Products');
const odersRoute    = require('./api/routes/Oders');
const userRoute     = require('./api/routes/Users');

mongoose.connect(
    'mongodb+srv://node-api-shop:'+
     "node-api-shop" +
     '@node-rest-api-uldpg.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
//app.use(static('upload')); // for publish
app.use('/uploads', static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json()
    }
    next();
});

// for Route
app.use('/products', productRoute);
app.use('/oders', odersRoute);
app.use('user', userRoute);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    });
});

module.exports = app; 
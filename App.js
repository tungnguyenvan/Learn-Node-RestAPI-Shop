const express = require('express');
const app = express();
const morgan = require('morgan'); 

const productRoute  = require('./api/routes/Products');
const odersRoute    = require('./api/routes/Oders');

app.use(morgan('dev'));

app.use('/products', productRoute);
app.use('/oders', odersRoute);

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
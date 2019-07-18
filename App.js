const express = require('express');
const app = express();

const productRoute  = require('./api/routes/Products');
const odersRoute    = require('./api/routes/Oders');

app.use('/products', productRoute);
app.use('./oders', odersRoute);

module.exports = app; 
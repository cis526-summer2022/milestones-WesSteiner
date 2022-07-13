const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const boxLocations = require('./endpoints/box-locations');
const createRequest = require('./endpoints/create-request');
const newRequest = require('./endpoints/new-request');
const showRequest = require('./endpoints/show-request');
const parseBody = require('./middleware/parse-body');

/** @module app 
 * The express application for our site
 */
var app = express();
app.post('/box-locations/:id/requests', parseBody, createRequest);

app.get('/box-locations/new', newRequest);
app.get('/box-locations/:id', showRequest);
app.get('/box-locations', boxLocations);
app.use(express.static('static'));
module.exports = app;
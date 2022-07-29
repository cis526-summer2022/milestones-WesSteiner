const express = require('express');

const serveHomepage = require('./endpoints/serve-homepage');
const boxLocations = require('./endpoints/box-locations');
const createRequest = require('./endpoints/create-request');
const newRequest = require('./endpoints/new-request');
const showRequest = require('./endpoints/show-request');
const newUser = require('./endpoints/new-user');
const createUser = require('./endpoints/create-user');
const newSession = require('./endpoints/new-session');
const createSession = require('./endpoints/create-session');
const indexHtml = require('./endpoints/index-html');
const destroySession = require('./endpoints/destroy-session');
const showDetails = require('./endpoints/show-details');
const requestFulfill = require('./endpoints/request-fulfill');
const changeFulfilled = require('./endpoints/change-fulfilled');
const createBox = require('./endpoints/create-box');
const newBox = require('./endpoints/new-box');
const showUsers = require('./endpoints/show-users');
const editUser = require('./endpoints/edit-user');
const changeUser = require('./endpoints/change-user');

const parseBody = require('./middleware/parse-body');
const basicAuth = require('./middleware/basic-auth');
const parseCookie = require('./middleware/parse-cookie');
const loadCookieSession = require('./middleware/load-cookie-session');
const loadSession = require('./middleware/load-session');
const authOnly = require('./middleware/authors-only');

/** @module app 
 * The express application for our site
 */
var app = express();

app.use(loadSession);

app.post('/box-locations/:id/requests', parseBody, createRequest);
app.post('/box-locations/:box_id/requests/:request_id/fulfilled', parseBody, changeFulfilled);
app.post('/box-locations/create', authOnly, parseBody, createBox);
app.post('/users/:user_id', authOnly, parseBody, changeUser);

app.get('/box-details/:id', showDetails);

app.get('/box-locations/:box_id/requests/:request_id/fulfill', requestFulfill);
app.get('/box-locations/new', authOnly, newBox);
app.get('/box-locations/:id', showRequest);
app.get('/box-locations', boxLocations);
app.get('/users/:user_id', authOnly, editUser);
app.get('/users', authOnly, showUsers);
app.get('/', indexHtml);

app.get('/signout', destroySession);
app.get('/signin', newSession);
app.post('/signin', parseBody, createSession);
app.get('/signup', newUser);
app.post('/signup', parseBody, createUser);

app.use(express.static('static'));

module.exports = app;
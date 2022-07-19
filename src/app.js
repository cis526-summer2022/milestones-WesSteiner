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

app.get('/box-locations/new', authOnly, newRequest);
app.get('/box-locations/:id', showRequest);
app.get('/box-locations', boxLocations);
app.get('/', indexHtml);

app.get('/signout', destroySession);
app.get('/signin', newSession);
app.post('/signin', parseBody, createSession);
app.get('/signup', newUser);
app.post('/signup', parseBody, createUser);

app.use(express.static('static'));

module.exports = app;
'use strict';

const express = require('express'),
  app = express(),
  authController = require('./api/auth/authController'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  serverless = require('serverless-http');

/**
 * Top Level Parser Settings
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

/**
 * On Every Request, Verify and Decode Jwt if given
 */
app.use((req, res, next) => authController.verifyAndDecodeJwt(req, res, next)); 

/**
 * Routing
 */
// Set layer /api of requests using api
const api = require('./api/apiRouter');
app.use('/api', api);

module.exports.handler = serverless(app);
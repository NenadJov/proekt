const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.get('/issuers', actions.getAllIssuers);
routes.post('/issuers/:issuerTypeId', actions.createIssuer);

module.exports = routes;
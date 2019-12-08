const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.get('/issuers', actions.getAllIssuers);
routes.post('/issuers/:issuerTypeId', actions.createIssuer);
routes.put('/issuers/:id', actions.updateBuyVolume);
routes.put('/issuers/:id', actions.updateSellVolume);

module.exports = routes;
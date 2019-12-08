const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.get('/transaction', actions.getAllTransaction);
routes.post('/transaction/:transactionTypeId', actions.transactionLog);

module.exports = routes;
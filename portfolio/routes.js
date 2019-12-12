const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.put('/portfolio/:id', actions.createPortfolio);
routes.get('/portfolio', actions.getAllUsersWithPortfolio);
routes.get('/portfolio/:id', actions.getSpecificUserWithPortfolio);
routes.put('/portfolio/:id', actions.updateBuyOrWithdrawCash);
routes.put('/portfolio/:id', actions.updateSellCash);

module.exports = routes;
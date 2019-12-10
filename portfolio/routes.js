const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.post('/portfolio/:usersId', actions.createPortfolio);
routes.get('/portfolio', actions.getAllUsersWithPortfolio);
routes.put('/portfolio/:id', actions.updateBuyOrWithdrawCash);
routes.put('/portfolio/:id', actions.updateSellCash);

module.exports = routes;
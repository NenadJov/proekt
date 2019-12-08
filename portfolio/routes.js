const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.post('/portfolio/:usersId', actions.createPortfolio);
routes.get('/portfolio', actions.getAllUsers);
routes.put('/portfolio/:id', actions.updateCash);

module.exports = routes;
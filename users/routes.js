const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.get('/users', actions.getAllUsers);
routes.post('/users', actions.createUser);

module.exports = routes; 
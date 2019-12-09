const express = require('express');
const actions = require('./actions');
const {emailValidator} = require('../validator');
const {checkIsOlderThan18} = require('../validator');


const routes = express.Router();

routes.post('/users', emailValidator, checkIsOlderThan18, actions.createUser);
routes.post('/login', actions.loginUser);
routes.get('/users', actions.getAllUsers);
routes.put('/users/:id', actions.updateUser);
routes.delete('/users/:id', actions.deleteUser);

module.exports = routes; 
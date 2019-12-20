const express = require('express');
const actions = require('./actions');
const {emailValidator} = require('../validator');
const {checkIsOlderThan18} = require('../validator');
const { verifyToken } = require('../middlewares/verifytoken');
const { celebrate, Joi } = require('celebrate');

const usersSchema = {
    body:{
        Name: Joi.string().required(),
        Surname: Joi.string().required(),
        Email: Joi.string().required(),
        Age: Joi.number().required(),
        Password: Joi.number().required()
    }
}

const routes = express.Router();

routes.post('/users', celebrate(usersSchema), emailValidator, checkIsOlderThan18, actions.createUser);
routes.post('/login', actions.loginUser);
routes.get('/users', verifyToken, actions.getAllUsers);
routes.put('/users/:id', verifyToken, actions.updateUser);
routes.delete('/users/:id', actions.deleteUser);

module.exports = routes; 
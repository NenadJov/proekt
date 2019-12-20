const express = require('express');
const actions = require('./actions');
const { celebrate, Joi } = require('celebrate');

const transactionSchema = {
    body:{
        Price: Joi.number().required(),
        Quantity: Joi.number().required(),
        Date: Joi.date().required(),
        PortfolioId: Joi.number().integer(),
        IssuersId: Joi.number().integer(),
        TransactionTypeId: Joi.number().integer()
    }
}

const routes = express.Router();

routes.get('/transaction', actions.getAllTransaction);
routes.post('/transaction/:transactionTypeId', celebrate(transactionSchema), actions.transactionLog);

module.exports = routes;
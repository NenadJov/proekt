const express = require('express');
const actions = require('./actions');
const { celebrate, Joi } = require('celebrate');

const issuerSchema = {
    body:{
        Name: Joi.string().required(),
        Exchange: Joi.string().required(),
        LastPrice: Joi.number().integer(),
        Volume: Joi.number().integer()
    }
}

const routes = express.Router();

routes.get('/issuers', actions.getAllIssuers);
routes.post('/issuers/:issuerTypeId', celebrate(issuerSchema), actions.createIssuer);
routes.put('/issuers/:id', actions.updateBuyVolume);
routes.put('/issuers/:id', actions.updateSellVolume);

module.exports = routes;
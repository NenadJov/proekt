const express = require('express');
const actions = require('./actions');
const { celebrate, Joi } = require('celebrate');

const portfolioSchema = {
    body:{
        Cash: Joi.number().required(),
        CreatedOn: Joi.date().required(),
        UsersId: Joi.number().integer()
    }
}

const routes = express.Router();

routes.post('/portfolio/:id', celebrate(portfolioSchema), actions.createPortfolio);
routes.get('/portfolio', actions.getAllUsersWithPortfolio);
routes.get('/portfolio/:id', actions.getSpecificUserWithPortfolio);
routes.put('/portfolio/:id', actions.updateBuyOrWithdrawCash);
routes.put('/portfolio/:id', actions.updateSellCash);

module.exports = routes;
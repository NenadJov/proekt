const express = require('express');
const usersRouter = require('./users/routes');
const portRouter = require('./portfolio/routes');
const issuRouter = require('./issuers/routes');
const transRouter = require('./transaction/routes');

const appRouter = express.Router();

appRouter.use(usersRouter);
appRouter.use(portRouter);
appRouter.use(issuRouter);
appRouter.use(transRouter);

module.exports = appRouter;